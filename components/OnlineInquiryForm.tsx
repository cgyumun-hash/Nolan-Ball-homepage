"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "h-[54px] border border-line bg-white px-4 outline-none transition-colors focus:border-brand-500";

const policySections = [
  {
    title: "1. Information We Collect",
    body: "We may collect personal information such as your name, email address, phone number and mailing address; usage data including IP address, browser, device details and pages visited; and sensitive or research data voluntarily provided with appropriate consent.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your data to provide and improve products and services, respond to inquiries, conduct research and development with consent, fulfill legal obligations, and ensure service security and functionality.",
  },
  {
    title: "3. Sharing and Disclosure of Information",
    body: "We do not sell personal data. We may share it with trusted service providers under confidentiality agreements, government authorities when legally required, or as part of a merger, acquisition or asset transfer.",
  },
  {
    title: "4. Data Retention",
    body: "We retain personal information only as long as necessary for the purposes described in this policy or as required by law.",
  },
  {
    title: "5. Your Rights",
    body: "Depending on your jurisdiction, you may access, correct, update or request deletion of your data, withdraw consent, or object to or restrict certain processing activities.",
  },
  {
    title: "6. Data Security",
    body: "Hakambio implements industry-standard safeguards against loss, misuse and unauthorized access.",
  },
  {
    title: "7. International Data Transfers",
    body: "When data is transferred internationally, appropriate legal safeguards are used to protect your privacy.",
  },
  {
    title: "8. Cookies and Tracking Technologies",
    body: "Our website may use cookies or similar technologies. You can manage cookie preferences through your browser settings.",
  },
  {
    title: "9. Changes to This Privacy Policy",
    body: "We may update this policy periodically. The latest version and effective date will be available on our website.",
  },
] as const;

export default function OnlineInquiryForm() {
  const [domain, setDomain] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
    setDomain("");
  }

  return (
    <section className="wrap-in2 pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[180px] max-b580:pt-[100px] max-b580:pb-[120px]">
      <form onSubmit={submit}>
        <h2 className="gfont mb-[30px] text-[38px] max-b580:text-[30px]">
          Privacy Policy
        </h2>

        <div className="mb-5 leading-[30px]">
          <p>Please read the contents regarding the collection and use of personal information carefully before giving your consent.</p>
          <p className="mb-2.5">Scope of Personal Information Collected: Name, Email, Contact Information</p>
          <p className="text-[16px]">※ Personal information is destroyed without delay once its purpose has been fulfilled. The retention period is up to three years.</p>
        </div>

        <div className="mb-[30px] h-[400px] overflow-y-auto border border-line bg-[#fafafa] p-[30px] text-[16px] leading-[26px] max-b580:p-5">
          <p className="mb-7">At Hakambio, we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our website, products, or services.</p>
          {policySections.map((section) => (
            <div key={section.title} className="mb-7">
              <h3 className="mb-2 font-bold">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
          <div>
            <h3 className="mb-2 font-bold">10. Contact Us</h3>
            <p className="mb-5">If you have questions, requests, or concerns regarding this Privacy Policy, please contact us at:</p>
            <strong className="gfont text-[21px]">Hakambio</strong>
            <p className="mt-2">#706, Byucksan E Centum Class One 2nd, 71 Centum-dong, Haeundae-gu, Busan, 48060, South Korea</p>
            <p>hakamb@naver.com</p>
            <p>051-746-7077</p>
          </div>
        </div>

        <label className="mb-[60px] flex cursor-pointer items-center gap-3 text-[17px]">
          <input type="checkbox" required className="h-5 w-5 accent-[#1eac44]" />
          <span>I agree to the Privacy Policy.</span>
        </label>

        <div className="border-t-2 border-ink-900">
          <FormRow label="Name">
            <input name="name" required className={`${inputClass} w-full max-w-[520px]`} />
          </FormRow>

          <FormRow label="TEL">
            <div className="flex items-center gap-3 max-b580:gap-2">
              <PhoneInput name="tel1" maxLength={3} />
              <span>-</span>
              <PhoneInput name="tel2" maxLength={4} />
              <span>-</span>
              <PhoneInput name="tel3" maxLength={4} />
            </div>
          </FormRow>

          <FormRow label="E-Mail">
            <div className="flex items-center gap-3 max-b860:flex-wrap max-b580:gap-2">
              <input name="emailId" required className={`${inputClass} w-[220px] max-b580:w-[calc(50%-16px)]`} />
              <span>@</span>
              <input name="emailDomain" required value={domain} onChange={(event) => setDomain(event.target.value)} className={`${inputClass} w-[220px] max-b580:w-[calc(50%-16px)]`} />
              <select aria-label="Select email domain" value={domain} onChange={(event) => setDomain(event.target.value)} className={`${inputClass} w-[220px] max-b580:w-full`}>
                <option value="">-Direct-</option>
                {["naver.com", "daum.net", "hanmail.net", "gmail.com", "nate.com", "hotmail.com", "msn.com", "google.com", "dreamwiz.com"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </FormRow>

          <FormRow label="Inquiry Message" alignTop>
            <textarea name="message" required className="min-h-[240px] w-full resize-y border border-line p-4 outline-none transition-colors focus:border-brand-500" />
          </FormRow>
        </div>

        {submitted && (
          <p role="status" className="mt-8 text-center font-medium text-brand-500">
            Your inquiry has been received.
          </p>
        )}

        <button type="submit" className="mx-auto mt-[50px] block h-[60px] w-[220px] bg-ink-900 text-[18px] font-bold text-white transition-colors hover:bg-brand-500">
          Inquire
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
