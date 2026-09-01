import "server-only";

import {
  createHash,
  randomBytes,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

import { ensureActivitySchema, getSql } from "@/lib/server/db";

export const ADMIN_SESSION_COOKIE_NAME = "nolan_activity_admin_session";
export const ADMIN_SESSION_DURATION_SECONDS = 12 * 60 * 60;

const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_SALT_LENGTH = 16;
const LOGIN_PASSWORD_MIN_LENGTH = 4;
const SESSION_TOKEN_LENGTH = 32;
const USERNAME_PATTERN = /^[a-z0-9._-]{3,64}$/;
const SESSION_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const DUMMY_SALT = Buffer.alloc(PASSWORD_SALT_LENGTH, 0x5a);
const DUMMY_PASSWORD_HASH = Buffer.alloc(PASSWORD_KEY_LENGTH, 0xa5);

export type AdminAccount = {
  id: string;
  username: string;
};

export type AdminSession = AdminAccount & {
  expiresAt: string;
};

export type AdminCredentials = {
  username: string;
  password: string;
};

export type SetupAdminInput = AdminCredentials & {
  setupToken: string;
};

export type AdminAuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "SETUP_UNAVAILABLE"
  | "UNAUTHORIZED"
  | "INVALID_INPUT"
  | "AUTH_UNAVAILABLE";

export class AdminAuthError extends Error {
  constructor(
    readonly code: AdminAuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AdminAuthError";
  }
}

type AdminPasswordRow = {
  id: string;
  username: string;
  password_hash: string;
  salt: string;
};

type AdminSessionRow = {
  admin_id: string;
  username: string;
  expires_at: string | Date;
};

export async function hasAdminAccount(): Promise<boolean> {
  await ensureActivitySchema();
  const sql = getSql();
  const rows = await sql`SELECT EXISTS (SELECT 1 FROM activity_admins) AS exists`;
  return rows[0]?.exists === true;
}

export async function setupAdmin(input: SetupAdminInput): Promise<AdminAccount> {
  await ensureActivitySchema();

  const configuredToken = process.env.ADMIN_SETUP_TOKEN;
  if (
    !configuredToken
    || typeof input?.setupToken !== "string"
    || !constantTimeStringEqual(configuredToken, input.setupToken)
  ) {
    throw new AdminAuthError(
      "SETUP_UNAVAILABLE",
      "관리자 초기 설정을 완료할 수 없습니다.",
    );
  }

  const username = normalizeUsername(input.username);
  validateNewPassword(input.password);

  const salt = randomBytes(PASSWORD_SALT_LENGTH);
  const passwordHash = await derivePassword(input.password, salt);
  const sql = getSql();

  try {
    const rows = await sql`
      INSERT INTO activity_admins (username, password_hash, salt)
      SELECT
        ${username},
        ${passwordHash.toString("base64")},
        ${salt.toString("base64")}
      WHERE NOT EXISTS (SELECT 1 FROM activity_admins)
      RETURNING id::text AS id, username
    `;

    const account = rows[0] as { id: string; username: string } | undefined;
    if (!account) {
      throw new AdminAuthError(
        "SETUP_UNAVAILABLE",
        "관리자 초기 설정을 완료할 수 없습니다.",
      );
    }

    return { id: account.id, username: account.username };
  } catch (error) {
    if (error instanceof AdminAuthError) throw error;

    throw new AdminAuthError(
      "SETUP_UNAVAILABLE",
      "관리자 초기 설정을 완료할 수 없습니다.",
    );
  }
}

export async function loginAdmin(input: AdminCredentials): Promise<AdminSession> {
  await ensureActivitySchema();

  const username = normalizeUsernameForLogin(input?.username);
  const password = typeof input?.password === "string" ? input.password : "";
  const sql = getSql();
  const rows = username
    ? await sql`
        SELECT id::text AS id, username, password_hash, salt
        FROM activity_admins
        WHERE username = ${username}
        LIMIT 1
      `
    : [];
  const admin = rows[0] as AdminPasswordRow | undefined;
  const validPassword = await verifyPassword(password, admin);

  if (!admin || !validPassword) {
    throw new AdminAuthError(
      "INVALID_CREDENTIALS",
      "아이디 또는 비밀번호가 올바르지 않습니다.",
    );
  }

  const token = randomBytes(SESSION_TOKEN_LENGTH).toString("base64url");
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1_000);

  try {
    await sql`DELETE FROM activity_sessions WHERE expires_at <= now()`;
    await sql`
      INSERT INTO activity_sessions (token_hash, admin_id, expires_at)
      VALUES (${tokenHash}, ${admin.id}::bigint, ${expiresAt.toISOString()}::timestamptz)
    `;

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
      maxAge: ADMIN_SESSION_DURATION_SECONDS,
    });
  } catch {
    throw new AdminAuthError(
      "AUTH_UNAVAILABLE",
      "로그인을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.",
    );
  }

  return {
    id: admin.id,
    username: admin.username,
    expiresAt: expiresAt.toISOString(),
  };
}

export async function logoutAdmin(): Promise<void> {
  await ensureActivitySchema();

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (token && SESSION_TOKEN_PATTERN.test(token)) {
    try {
      const sql = getSql();
      await sql`DELETE FROM activity_sessions WHERE token_hash = ${hashSessionToken(token)}`;
    } catch {
      // 브라우저 쿠키는 아래에서 항상 폐기합니다. 만료된 DB 행은 다음 로그인 때 정리됩니다.
    }
  }

  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  await ensureActivitySchema();

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!token || !SESSION_TOKEN_PATTERN.test(token)) return null;

  const sql = getSql();
  const rows = await sql`
    SELECT
      sessions.admin_id::text AS admin_id,
      admins.username,
      sessions.expires_at
    FROM activity_sessions AS sessions
    INNER JOIN activity_admins AS admins ON admins.id = sessions.admin_id
    WHERE sessions.token_hash = ${hashSessionToken(token)}
      AND sessions.expires_at > now()
    LIMIT 1
  `;
  const row = rows[0] as AdminSessionRow | undefined;
  if (!row) return null;

  const expiresAt = new Date(row.expires_at);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= Date.now()) return null;

  return {
    id: row.admin_id,
    username: row.username,
    expiresAt: expiresAt.toISOString(),
  };
}

export async function requireAdminSession(): Promise<AdminSession> {
  await ensureActivitySchema();
  const session = await getAdminSession();

  if (!session) {
    throw new AdminAuthError("UNAUTHORIZED", "관리자 로그인이 필요합니다.");
  }

  return session;
}

function normalizeUsername(value: unknown): string {
  if (typeof value !== "string") {
    throw new AdminAuthError("INVALID_INPUT", "관리자 정보를 확인해 주세요.");
  }

  const username = value.trim().toLocaleLowerCase("en-US");
  if (!USERNAME_PATTERN.test(username)) {
    throw new AdminAuthError("INVALID_INPUT", "관리자 정보를 확인해 주세요.");
  }

  return username;
}

function normalizeUsernameForLogin(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const username = value.trim().toLocaleLowerCase("en-US");
  return USERNAME_PATTERN.test(username) ? username : null;
}

function validateNewPassword(value: unknown): asserts value is string {
  if (
    typeof value !== "string"
    || value.length < 12
    || value.length > 256
  ) {
    throw new AdminAuthError("INVALID_INPUT", "관리자 정보를 확인해 주세요.");
  }
}

async function verifyPassword(
  password: string,
  admin: AdminPasswordRow | undefined,
): Promise<boolean> {
  let salt = DUMMY_SALT;
  let expectedHash = DUMMY_PASSWORD_HASH;
  let storedHashValid = false;

  if (admin) {
    try {
      const decodedSalt = Buffer.from(admin.salt, "base64");
      const decodedHash = Buffer.from(admin.password_hash, "base64");
      if (
        decodedSalt.length === PASSWORD_SALT_LENGTH
        && decodedHash.length === PASSWORD_KEY_LENGTH
      ) {
        salt = decodedSalt;
        expectedHash = decodedHash;
        storedHashValid = true;
      }
    } catch {
      storedHashValid = false;
    }
  }

  const passwordLengthValid =
    password.length >= LOGIN_PASSWORD_MIN_LENGTH && password.length <= 256;
  const passwordForDerivation = passwordLengthValid ? password : "invalid-password";
  const derivedHash = await derivePassword(passwordForDerivation, salt);
  const hashesMatch = timingSafeEqual(derivedHash, expectedHash);
  return storedHashValid && passwordLengthValid && hashesMatch;
}

function derivePassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      PASSWORD_KEY_LENGTH,
      { N: 16_384, r: 8, p: 1, maxmem: 64 * 1_024 * 1_024 },
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      },
    );
  });
}

function constantTimeStringEqual(expected: string, supplied: string): boolean {
  const expectedDigest = createHash("sha256").update(expected, "utf8").digest();
  const suppliedDigest = createHash("sha256").update(supplied, "utf8").digest();
  return timingSafeEqual(expectedDigest, suppliedDigest);
}

function hashSessionToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}
