"use client";

import { FormEvent, useState } from "react";

import { COMPANY, INQUIRY_FORM_MESSAGES, INQUIRY_TYPES } from "@/lib/site";
import {
  EN_COMPANY,
  EN_INQUIRY_COPY,
  EN_INQUIRY_FORM_MESSAGES,
  EN_INQUIRY_TYPE_OPTIONS,
} from "@/lib/site.en";
import type { SiteLocale } from "@/lib/locale";
import { CN_COMPANY } from "@/lib/site.cn";

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

const cnPolicySections = [
  { title: "1. 收集的个人信息", body: "为处理咨询，我们收集机构名称、联系人姓名、部门或职务、电话号码及电子邮箱。" },
  { title: "2. 使用目的", body: "用于回复产品、样品及报价咨询，提供和改进服务，并履行法律义务。" },
  { title: "3. 提供及委托处理", body: "我们不出售个人信息，仅在法律要求或履行业务所需的范围内向受保密义务约束的受托方提供。" },
  { title: "4. 保留与删除", body: "达到收集目的后将及时删除，最长保留期限为三年；法律另有规定的除外。" },
  { title: "5. 信息主体的权利", body: "您可以申请查阅、更正、删除或停止处理个人信息，并可撤回同意。" },
  { title: "6. 安全措施", body: "Nolan Ball Korea采取必要的技术和管理措施，防止个人信息丢失、被盗、泄露或损坏。" },
  { title: "7. Cookie", body: "本网站可能使用Cookie或类似技术，您可以通过浏览器设置拒绝保存Cookie。" },
  { title: "8. 政策变更", body: "本政策可能更新，变更时将在网站上公布最新内容及生效日期。" },
] as const;

export default function OnlineInquiryForm({ locale = "ko" }: { locale?: SiteLocale }) {
  const english = locale === "en";
  const chinese = locale === "cn";
  const tr = (en: string, ko: string, cn: string) => english ? en : chinese ? cn : ko;
  const company = english ? EN_COMPANY : chinese ? CN_COMPANY : COMPANY;
  const messages = english
    ? EN_INQUIRY_FORM_MESSAGES
    : chinese
      ? { submit: "提交咨询", submitting: "提交中...", success: "您的咨询已提交。确认后我们会与您联系。", failure: "提交失败，请稍后重试或通过电子邮件联系我们。" }
      : INQUIRY_FORM_MESSAGES;
  const inquiryTypeOptions = english
    ? EN_INQUIRY_TYPE_OPTIONS
    : INQUIRY_TYPES.map((value, index) => ({
        label: chinese ? ["产品咨询", "样品申请", "报价咨询", "经销·合作", "海外出口"][index] : value,
        value,
      }));
  const localizedPolicySections = english ? EN_INQUIRY_COPY.policySections : chinese ? cnPolicySections : policySections;
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
          {tr(EN_INQUIRY_COPY.consentTitle, "개인정보 수집·이용 동의", "个人信息收集与使用同意")}
        </h2>

        <div className="mb-5 leading-[30px]">
          <p>{tr(EN_INQUIRY_COPY.consentIntro, "동의하시기 전에 개인정보의 수집·이용에 관한 아래 내용을 자세히 읽어 주세요.", "同意前请仔细阅读以下个人信息收集与使用说明。")}</p>
          <p className="mb-2.5">{tr(EN_INQUIRY_COPY.collectedItems, "수집 항목: 기관명, 담당자명, 부서·직책, 연락처, 이메일", "收集项目：机构名称、联系人、部门·职务、电话、电子邮箱")}</p>
          <p className="text-[16px]">{tr(EN_INQUIRY_COPY.retentionSummary, "※ 수집 목적이 달성되면 개인정보는 지체 없이 파기되며, 보유 기간은 최대 3년입니다.", "达到收集目的后将及时删除，最长保留期限为三年。")}</p>
        </div>

        <div className="mb-[30px] h-[400px] overflow-y-auto border border-line bg-[#fafafa] p-[30px] text-[16px] leading-[26px] max-b580:p-5">
          <p className="mb-7">{tr(EN_INQUIRY_COPY.policyIntro, "놀란볼코리아는 이용자의 개인정보를 소중하게 생각합니다. 본 방침은 웹사이트·제품·서비스 이용 과정에서 개인정보를 어떻게 수집·이용·보관·파기하는지 설명합니다.", "Nolan Ball Korea重视您的个人信息。本说明介绍在网站及咨询服务中如何收集、使用、保存和删除个人信息。")}</p>
          {localizedPolicySections.map((section) => (
            <div key={section.title} className="mb-7">
              <h3 className="mb-2 font-bold">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
          <div>
            <h3 className="mb-2 font-bold">{tr(EN_INQUIRY_COPY.contactTitle, "9. 문의처", "9. 联系方式")}</h3>
            <p className="mb-5">{tr(EN_INQUIRY_COPY.contactBody, "본 개인정보처리방침에 관한 문의는 아래로 연락해 주세요.", "如对个人信息处理有疑问，请通过以下方式联系我们。")}</p>
            <strong className="gfont text-[21px]">{company.legal}</strong>
            <p className="mt-2">{company.address}</p>
            <p>{company.email}</p>
            <p>
              {company.tel} ({tr(EN_INQUIRY_COPY.faxLabel, "팩스", "传真")} {company.fax})
            </p>
          </div>
        </div>

        <label className="mb-[60px] flex cursor-pointer items-center gap-3 text-[17px]">
          <input name="privacy" value="agreed" type="checkbox" required className="h-5 w-5 accent-brand-500" />
          <span>{tr(EN_INQUIRY_COPY.agree, "개인정보 수집·이용에 동의합니다.", "我同意收集和使用个人信息。")}</span>
        </label>

        <div className="border-t-2 border-ink-900">
          <FormRow label={tr(EN_INQUIRY_COPY.fields.organization, "기관명", "机构名称")}>
            <input name="organization" required className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.name, "담당자명", "联系人")}>
            <input name="name" required className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.department, "부서·직책", "部门·职务")}>
            <input name="department" className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.phone, "연락처", "联系电话")}>
            <div className="flex min-w-0 items-center gap-3 max-b580:gap-1.5">
              <PhoneInput name="tel1" maxLength={3} />
              <span>-</span>
              <PhoneInput name="tel2" maxLength={4} />
              <span>-</span>
              <PhoneInput name="tel3" maxLength={4} />
            </div>
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.email, "이메일", "电子邮箱")}>
            <div className="flex items-center gap-3 max-b860:flex-wrap max-b580:gap-2">
              <input name="emailId" required className={`${inputClass} w-[220px] max-b580:min-w-0 max-b580:flex-1`} />
              <span>@</span>
              <input name="emailDomain" required value={domain} onChange={(event) => setDomain(event.target.value)} className={`${inputClass} w-[220px] max-b580:min-w-0 max-b580:flex-1`} />
              <select aria-label={tr(EN_INQUIRY_COPY.emailDomainLabel, "이메일 도메인 선택", "选择邮箱域名")} value={domain} onChange={(event) => setDomain(event.target.value)} className={`${inputClass} w-[220px] max-b580:w-full`}>
                <option value="">{tr(EN_INQUIRY_COPY.emailDomainCustom, "직접 입력", "手动输入")}</option>
                {["naver.com", "daum.net", "hanmail.net", "gmail.com", "nate.com", "hotmail.com", "msn.com", "google.com", "dreamwiz.com"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.inquiryType, "문의 유형", "咨询类型")}>
            <select name="inquiryType" required className={`${inputClass} w-full max-w-[320px]`}>
              <option value="">{tr(EN_INQUIRY_COPY.selectPrompt, "선택해 주세요", "请选择")}</option>
              {inquiryTypeOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.endoscope, "사용 내시경 종류·채널 규격", "内镜类型·管腔规格")}>
            <input
              name="endoscope"
              placeholder={tr(EN_INQUIRY_COPY.endoscopePlaceholder, "예) 대장 내시경 · 채널 3.7 mm", "例：肠镜 · 管腔3.7 mm")}
              className={`${inputClass} w-full max-w-[520px]`}
            />
          </FormRow>

          <FormRow label={tr(EN_INQUIRY_COPY.fields.message, "문의 내용", "咨询内容")} alignTop>
            <textarea name="message" required className="min-h-[240px] w-full resize-y border border-line p-4 outline-none transition-colors focus:border-brand-500" />
          </FormRow>
        </div>

        {status === "success" && (
          <p role="status" className="mt-8 text-center font-medium text-sky-700">
            {messages.success}
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="mt-8 text-center font-medium text-red-700">
            {messages.failure}{" "}
            <a href={`mailto:${company.email}`} className="underline">
              {company.email}
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mx-auto mt-[50px] block h-[60px] w-[220px] bg-ink-900 text-[18px] font-bold text-white transition-colors hover:bg-brand-500 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting"
            ? messages.submitting
            : messages.submit}
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
