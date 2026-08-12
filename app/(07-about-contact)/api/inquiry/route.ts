import nodemailer from "nodemailer";

import { COMPANY, INQUIRY_FORM_MESSAGES, INQUIRY_TYPES } from "@/lib/site";

export const runtime = "nodejs";

const MAX_LENGTH = {
  organization: 120,
  name: 80,
  department: 120,
  email: 254,
  endoscope: 200,
  message: 5000,
} as const;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const submissions = new Map<string, { count: number; expiresAt: number }>();

type Inquiry = {
  organization: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  inquiryType: string;
  endoscope: string;
  message: string;
};

function getText(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function isValid(inquiry: Inquiry) {
  const phoneDigits = inquiry.phone.replaceAll("-", "");

  return (
    inquiry.organization.length > 0 &&
    inquiry.organization.length <= MAX_LENGTH.organization &&
    inquiry.name.length > 0 &&
    inquiry.name.length <= MAX_LENGTH.name &&
    inquiry.department.length <= MAX_LENGTH.department &&
    /^\d{9,11}$/.test(phoneDigits) &&
    inquiry.email.length <= MAX_LENGTH.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) &&
    INQUIRY_TYPES.some((type) => type === inquiry.inquiryType) &&
    inquiry.endoscope.length <= MAX_LENGTH.endoscope &&
    inquiry.message.length > 0 &&
    inquiry.message.length <= MAX_LENGTH.message
  );
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const current = submissions.get(clientIp);

  if (!current || current.expiresAt <= now) {
    submissions.set(clientIp, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ ok: false, message: "잘못된 요청 형식입니다." }, { status: 415 });
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: "문의 내용을 확인해 주세요." }, { status: 400 });
  }

  // 허니팟 필드가 채워진 자동 입력은 메일을 보내지 않고 조용히 종료합니다.
  if (getText(body, "website")) {
    return Response.json({ ok: true });
  }

  const phoneParts = ["tel1", "tel2", "tel3"].map((key) => getText(body, key));
  const email = `${getText(body, "emailId")}@${getText(body, "emailDomain")}`;
  const inquiry: Inquiry = {
    organization: getText(body, "organization"),
    name: getText(body, "name"),
    department: getText(body, "department"),
    phone: phoneParts.join("-"),
    email,
    inquiryType: getText(body, "inquiryType"),
    endoscope: getText(body, "endoscope"),
    message: getText(body, "message"),
  };

  if (getText(body, "privacy") !== "agreed" || !isValid(inquiry)) {
    return Response.json({ ok: false, message: "필수 입력 항목을 확인해 주세요." }, { status: 400 });
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(clientIp)) {
    return Response.json(
      { ok: false, message: "문의가 연속으로 접수되었습니다. 잠시 후 다시 시도해 주세요." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const smtpHost = process.env.SMTP_HOST ?? "smtp.naver.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? "465");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipient = process.env.INQUIRY_TO_EMAIL ?? COMPANY.email;

  if (!smtpUser || !smtpPass || !Number.isInteger(smtpPort)) {
    console.error("문의 메일 SMTP 환경변수가 설정되지 않았습니다.");
    return Response.json(
      { ok: false, message: INQUIRY_FORM_MESSAGES.failure },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const subjectOrganization = inquiry.organization.replace(/[\r\n]/g, " ");
  const subjectType = inquiry.inquiryType.replace(/[\r\n]/g, " ");
  const rows = [
    ["기관명", inquiry.organization],
    ["담당자명", inquiry.name],
    ["부서·직책", inquiry.department || "-"],
    ["연락처", inquiry.phone],
    ["이메일", inquiry.email],
    ["문의 유형", inquiry.inquiryType],
    ["사용 내시경 종류·채널 규격", inquiry.endoscope || "-"],
  ];
  const receivedAt = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  try {
    await transporter.sendMail({
      from: { name: COMPANY.nameEn, address: smtpUser },
      to: recipient,
      replyTo: inquiry.email,
      subject: `[놀란볼코리아 홈페이지 문의] ${subjectType} - ${subjectOrganization}`,
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        `접수 시각: ${receivedAt}`,
        `접속 IP: ${clientIp}`,
        "",
        "문의 내용",
        inquiry.message,
      ].join("\n"),
      html: `
        <h2>놀란볼코리아 홈페이지 문의</h2>
        <table style="border-collapse:collapse;width:100%;max-width:720px">
          <tbody>
            ${rows
              .map(
                ([label, value]) => `
                  <tr>
                    <th style="border:1px solid #ddd;background:#f7f7f7;padding:10px;text-align:left;width:180px">${escapeHtml(label)}</th>
                    <td style="border:1px solid #ddd;padding:10px">${escapeHtml(value)}</td>
                  </tr>`,
              )
              .join("")}
            <tr>
              <th style="border:1px solid #ddd;background:#f7f7f7;padding:10px;text-align:left">접수 시각</th>
              <td style="border:1px solid #ddd;padding:10px">${escapeHtml(receivedAt)}</td>
            </tr>
            <tr>
              <th style="border:1px solid #ddd;background:#f7f7f7;padding:10px;text-align:left">접속 IP</th>
              <td style="border:1px solid #ddd;padding:10px">${escapeHtml(clientIp)}</td>
            </tr>
          </tbody>
        </table>
        <h3 style="margin-top:24px">문의 내용</h3>
        <p style="white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("문의 메일 전송에 실패했습니다.", error);
    return Response.json(
      { ok: false, message: INQUIRY_FORM_MESSAGES.failure },
      { status: 502 },
    );
  }
}
