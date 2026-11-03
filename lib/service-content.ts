export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  included: readonly string[];
  audience: string;
  steps: readonly { title: string; description: string }[];
  faqs: readonly ServiceFaq[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "hr-consulting": {
    slug: "hr-consulting",
    title: "HR Consulting",
    eyebrow: "HR consulting",
    description:
      "Practical policies, documents and people support for growing businesses.",
    included: [
      "HR compliance audits",
      "Policies and employee handbooks",
      "Contracts and HR documents",
      "Disciplinary and termination support",
      "Performance systems and job design",
      "Employee data protection",
      "Recruitment and onboarding",
      "Manager training",
    ],
    audience:
      "For employers who need clear HR processes and reliable employment documents without building an in-house HR department.",
    steps: [
      {
        title: "Health check",
        description:
          "We review your current contracts, policies and people processes, then agree on the work that matters most.",
      },
      {
        title: "Fix and document",
        description:
          "We prepare or update the agreed policies and documents and help you plan any required changes.",
      },
      {
        title: "Put it into practice",
        description:
          "We explain the process to the people who need to use it and support you as questions come up.",
      },
    ],
    faqs: [
      {
        question: "What does HR consulting cover?",
        answer:
          "Support can include HR reviews, policies, employee handbooks, contracts, disciplinary processes, performance systems and onboarding.",
      },
      {
        question: "Can you help prepare employment documents?",
        answer:
          "Yes. Document support can include contracts, HR letters, policies and employee handbooks, scoped to your needs.",
      },
      {
        question: "Can you support a disciplinary process?",
        answer:
          "We can help you plan and document a fair process, based on the facts and the applicable requirements.",
      },
      {
        question: "Do you help with recruitment and onboarding?",
        answer:
          "Recruitment and onboarding support is available and can be included in an agreed HR scope.",
      },
      {
        question: "Do you provide legal representation?",
        answer:
          "HR consulting supports workplace processes and records. Court representation or legal advice should be discussed with a qualified advocate.",
      },
    ],
  },
  payroll: {
    slug: "payroll",
    title: "Payroll Services",
    eyebrow: "Payroll services",
    description:
      "Careful payroll processing, payslips and statutory support, with employer approval before payment.",
    included: [
      "Monthly payroll processing",
      "Statutory filing and remittance",
      "Payslips and salary payment files for bank or M-Pesa",
      "Payroll setup and clean-up",
      "Final dues and terminal benefits",
      "Year-end returns and P9 forms",
      "Payroll audits",
      "Expatriate payroll",
    ],
    audience:
      "For employers who want payroll records and calculations handled consistently, with a clear review step before staff are paid.",
    steps: [
      {
        title: "You send changes",
        description:
          "Share approved employee, attendance and pay changes using the agreed process.",
      },
      {
        title: "We calculate, you approve",
        description:
          "We prepare payroll for your review and make any agreed corrections before it is finalised.",
      },
      {
        title: "Staff get paid",
        description:
          "After approval, payroll outputs and the agreed bank or M-Pesa payment file are prepared.",
      },
      {
        title: "Returns filed",
        description:
          "We prepare the agreed statutory filings and remittance information for the payroll period.",
      },
    ],
    faqs: [
      {
        question: "What is included in payroll support?",
        answer:
          "Depending on the agreed scope, this can include payroll processing, payslips, statutory filings, payment files and payroll reporting.",
      },
      {
        question: "Who approves payroll before staff are paid?",
        answer:
          "You review and approve the payroll before payment outputs are finalised.",
      },
      {
        question: "Can you help set up or clean up payroll?",
        answer:
          "Yes. Payroll setup and clean-up can be scoped after we understand your current records and process.",
      },
      {
        question: "Can you prepare P9 forms?",
        answer:
          "Year-end reporting, including P9 forms, can be included in the agreed payroll scope.",
      },
      {
        question: "Can you process expatriate payroll?",
        answer:
          "Expatriate payroll support is available. The details and responsibilities are agreed before work starts.",
      },
    ],
  },
  "compliance-audits": {
    slug: "compliance-audits",
    title: "HR Compliance Audits",
    eyebrow: "Compliance audits",
    description:
      "A clear review of your HR records, payroll and remittances against applicable Kenyan requirements.",
    included: [
      "Review of employment contracts and HR files",
      "Review of policies and employee records",
      "Payroll and statutory deduction checks",
      "Review of filing and remittance records",
      "A written summary of identified gaps",
      "Prioritised recommendations for next steps",
    ],
    audience:
      "For employers who want a clearer view of gaps in their HR and payroll records before deciding what to address.",
    steps: [
      {
        title: "Agree the review",
        description:
          "We confirm the records, period and topics to be included in the audit.",
      },
      {
        title: "Review the records",
        description:
          "We examine the agreed HR documents, payroll information and remittance records.",
      },
      {
        title: "Explain the findings",
        description:
          "We walk you through the issues identified and distinguish urgent items from longer-term improvements.",
      },
      {
        title: "Plan the next steps",
        description:
          "You receive practical recommendations and can decide whether to request help with follow-up work.",
      },
    ],
    faqs: [
      {
        question: "What records can a compliance audit cover?",
        answer:
          "The agreed scope may include contracts, HR files, policies, payroll records, statutory deductions and filing or remittance records.",
      },
      {
        question: "Will the audit include a written report?",
        answer:
          "The agreed audit scope can include a written summary of findings and practical recommendations.",
      },
      {
        question: "Does an audit automatically fix the issues found?",
        answer:
          "The review identifies and explains gaps. Corrective work is planned separately with you and may be scoped as a follow-up.",
      },
      {
        question: "Do you need access to employee information?",
        answer:
          "Only information relevant to the agreed review should be shared, using a secure process agreed before work begins.",
      },
      {
        question: "Is a compliance audit the same as legal advice?",
        answer:
          "No. It is a review of the agreed HR and payroll records. For legal advice or representation, consult a qualified advocate.",
      },
    ],
  },
};
