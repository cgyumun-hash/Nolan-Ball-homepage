"use client";

import { FormEvent, useState } from "react";

import { COMPANY, INQUIRY_FORM_MESSAGES, INQUIRY_TYPES } from "@/lib/site";

const inputClass =
  "h-[54px] border border-line bg-white px-4 outline-none transition-colors focus:border-brand-500";

/**
 * ⚠️ 자료정리 7장 체크리스트에서 개인정보처리방침은 "신규 작성 필요" 상태입니다.
 *    아래는 하캄바이오 원문을 놀란볼코리아 기준으로 옮긴 임시 문안이며,
 *    문의폼을 실제로 운영하기 전에 개인정보처리방침 담당자를 지정하고
 *    정식 문안으로 교체해야 합니다(자료정리 5-2).
 */
const policySections = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "문의 접수를 위해 기관명, 담당자명, 부서·직책, 연락처, 이메일 주소를 수집합니다. 서비스 이용 과정에서 IP 주소, 브라우저·기기 정보, 방문 페이지 등의 이용 기록이 자동으로 생성될 수 있습니다.",
  },
  {
    title: "2. 개인정보의 이용 목적",
    body: "제품·샘플·견적 문의에 대한 회신, 제품 및 서비스 제공과 개선, 법령상 의무 이행, 서비스 보안 유지를 위해 이용합니다.",
  },
  {
    title: "3. 개인정보의 제공 및 위탁",
    body: "개인정보를 판매하지 않습니다. 법령에 따라 요구되는 경우 또는 비밀유지 계약을 맺은 수탁업체에 업무 수행에 필요한 범위에서만 제공할 수 있습니다.",
  },
  {
    title: "4. 개인정보의 보유 및 파기",
    body: "수집 목적이 달성되면 지체 없이 파기합니다. 보유 기간은 최대 3년이며, 법령에서 별도로 정한 경우 해당 기간을 따릅니다.",
  },
  {
    title: "5. 정보주체의 권리",
    body: "본인의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있으며 동의를 철회할 수 있습니다.",
  },
  {
    title: "6. 개인정보의 안전성 확보 조치",
    body: "놀란볼코리아는 개인정보의 분실, 도난, 유출, 위조·변조 또는 훼손을 방지하기 위해 필요한 기술적·관리적 조치를 시행합니다.",
  },
  {
    title: "7. 쿠키의 사용",
    body: "본 웹사이트는 쿠키 또는 유사 기술을 사용할 수 있습니다. 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.",
  },
  {
    title: "8. 개인정보처리방침의 변경",
    body: "본 방침은 변경될 수 있으며, 변경 시 웹사이트를 통해 최신 내용과 시행일을 안내합니다.",
  },
] as const;

export default function OnlineInquiryForm() {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Inquiry request failed with status ${response.status}`);
      }

      setStatus("success");
      form.reset();
      setDomain("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section className="wrap-in2 pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[180px] max-b580:pt-[100px] max-b580:pb-[120px]">
      <form onSubmit={submit}>
        {/* 허니팟 — 화면에도 스크린리더에도 노출되지 않습니다. 봇만 채웁니다. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <h2 className="gfont mb-[30px] text-[38px] max-b580:text-[30px]">
          개인정보 수집·이용 동의
        </h2>

        <div className="mb-5 leading-[30px]">
          <p>동의하시기 전에 개인정보의 수집·이용에 관한 아래 내용을 자세히 읽어 주세요.</p>
          <p className="mb-2.5">수집 항목: 기관명, 담당자명, 부서·직책, 연락처, 이메일</p>
          <p className="text-[16px]">※ 수집 목적이 달성되면 개인정보는 지체 없이 파기되며, 보유 기간은 최대 3년입니다.</p>
        </div>

        <div className="mb-[30px] h-[400px] overflow-y-auto border border-line bg-[#fafafa] p-[30px] text-[16px] leading-[26px] max-b580:p-5">
          <p className="mb-7">놀란볼코리아는 이용자의 개인정보를 소중하게 생각합니다. 본 방침은 웹사이트·제품·서비스 이용 과정에서 개인정보를 어떻게 수집·이용·보관·파기하는지 설명합니다.</p>
          {policySections.map((section) => (
            <div key={section.title} className="mb-7">
              <h3 className="mb-2 font-bold">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
          <div>
            <h3 className="mb-2 font-bold">9. 문의처</h3>
            <p className="mb-5">본 개인정보처리방침에 관한 문의는 아래로 연락해 주세요.</p>
            <strong className="gfont text-[21px]">{COMPANY.legal}</strong>
            <p className="mt-2">{COMPANY.address}</p>
            <p>{COMPANY.email}</p>
            <p>
              {COMPANY.tel} (팩스 {COMPANY.fax})
            </p>
          </div>
        </div>

        <label className="mb-[60px] flex cursor-pointer items-center gap-3 text-[17px]">
          <input name="privacy" value="agreed" type="checkbox" required className="h-5 w-5 accent-[#1eac44]" />
          <span>개인정보 수집·이용에 동의합니다.</span>
        </label>

        <div className="border-t-2 border-ink-900">
          <FormRow label="기관명">
            <input name="organization" required className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label="담당자명">
            <input name="name" required className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label="부서·직책">
            <input name="department" className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label="연락처">
            <div className="flex items-center gap-3 max-b580:gap-2">
              <PhoneInput name="tel1" maxLength={3} />
              <span>-</span>
              <PhoneInput name="tel2" maxLength={4} />
              <span>-</span>
              <PhoneInput name="tel3" maxLength={4} />
            </div>
          </FormRow>

          <FormRow label="이메일">
            <div className="flex items-center gap-3 max-b860:flex-wrap max-b580:gap-2">
              <input name="emailId" required className={`${inputClass} w-[220px] max-b580:w-[calc(50%-16px)]`} />
              <span>@</span>
              <input name="emailDomain" required value={domain} onChange={(event) => setDomain(event.target.value)} className={`${inputClass} w-[220px] max-b580:w-[calc(50%-16px)]`} />
              <select aria-label="이메일 도메인 선택" value={domain} onChange={(event) => setDomain(event.target.value)} className={`${inputClass} w-[220px] max-b580:w-full`}>
                <option value="">직접 입력</option>
                {["naver.com", "daum.net", "hanmail.net", "gmail.com", "nate.com", "hotmail.com", "msn.com", "google.com", "dreamwiz.com"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </FormRow>

          <FormRow label="문의 유형">
            <select name="inquiryType" required className={`${inputClass} w-full max-w-[320px]`}>
              <option value="">선택해 주세요</option>
              {INQUIRY_TYPES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FormRow>

          <FormRow label="사용 내시경 종류·채널 규격">
            <input
              name="endoscope"
              placeholder="예) 대장 내시경 · 채널 3.7 mm"
              className={`${inputClass} w-full max-w-[520px]`}
            />
          </FormRow>

          <FormRow label="문의 내용" alignTop>
            <textarea name="message" required className="min-h-[240px] w-full resize-y border border-line p-4 outline-none transition-colors focus:border-brand-500" />
          </FormRow>
        </div>

        {status === "success" && (
          <p role="status" className="mt-8 text-center font-medium text-brand-500">
            {INQUIRY_FORM_MESSAGES.success}
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="mt-8 text-center font-medium text-red-700">
            {INQUIRY_FORM_MESSAGES.failure}{" "}
            <a href={`mailto:${COMPANY.email}`} className="underline">
              {COMPANY.email}
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mx-auto mt-[50px] block h-[60px] w-[220px] bg-ink-900 text-[18px] font-bold text-white transition-colors hover:bg-brand-500 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting"
            ? INQUIRY_FORM_MESSAGES.submitting
            : INQUIRY_FORM_MESSAGES.submit}
        </button>
      </form>
    </section>
  );
}

function FormRow({ label, children, alignTop = false }: { label: string; children: React.ReactNode; alignTop?: boolean }) {
  return (
    <div className={`flex border-b border-line py-[25px] max-b580:flex-col max-b580:gap-3 ${alignTop ? "items-start" : "items-center"}`}>
      <div className="w-[220px] shrink-0 text-[17px] font-bold max-b580:w-full">{label}</div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function PhoneInput({ name, maxLength }: { name: string; maxLength: number }) {
  return <input name={name} required inputMode="numeric" pattern="[0-9]*" maxLength={maxLength} className={`${inputClass} w-[140px] max-b580:min-w-0 max-b580:flex-1`} />;
}
