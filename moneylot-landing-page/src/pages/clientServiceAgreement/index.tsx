import axios from "axios";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { ReactNode } from "react";

const API_BASE_URL = "https://mlotdev.azurewebsites.net/api/v1";

const CLIENT_SERVICE_AGREEMENT_CONFIRM_SIGNATURE = "";

const ClientServiceAgreement = () => {
  const [searchParams] = useSearchParams();
  const agreementDetails = useMemo(
    () => getAgreementDetails(searchParams),
    [searchParams]
  );

  const clientServiceAgreementPreamble = useMemo(
    () => buildClientServiceAgreementPreamble(agreementDetails),
    [agreementDetails]
  );

  const [confirming, setConfirming] = useState(false);
  const [ackRiskDisclosure, setAckRiskDisclosure] = useState(false);
  const [ackTerms, setAckTerms] = useState(false);

  const canConfirm = ackRiskDisclosure && ackTerms && !confirming;

  const submitAgreement = async () => {
    if (!ackRiskDisclosure || !ackTerms) return;
    if (!agreementDetails.email) {
      toast.error("Email is missing from this agreement link.");
      return;
    }

    setConfirming(true);
    try {
      await axios.post(
        `${API_BASE_URL}/auth/confirm-agreement/${encodeURIComponent(
          agreementDetails.email
        )}`,
        undefined,
        {
          headers: CLIENT_SERVICE_AGREEMENT_CONFIRM_SIGNATURE
            ? { "X-Auth-Signature": CLIENT_SERVICE_AGREEMENT_CONFIRM_SIGNATURE }
            : undefined,
        }
      );

      toast.success("Confirmed.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setConfirming(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <section className="w-full">
        <header className="w-full bg-[#1B332D] px-6 py-4 sm:px-10">
          <div className="mx-auto w-full max-w-[1100px]">
            <h1 className="text-center text-white font-semibold text-[23px] sm:text-[25px]">
              Client Service Agreement
            </h1>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1100px] px-6 py-8 sm:px-10 sm:py-10">
          <AgreementSection title="RISK DISCLOSURE">
            <Paragraphs paragraphs={RISK_DISCLOSURE_PARAGRAPHS} />
          </AgreementSection>

          <AgreementSection title="EMAIL OR OTHER ELECTRONIC COMMUNICATION INDEMNITY">
            <Paragraphs paragraphs={ELECTRONIC_COMMUNICATION_PARAGRAPHS} />
          </AgreementSection>

          <AgreementSection title="TERMS AND CONDITIONS">
            {TERMS_AND_CONDITIONS_SUBSECTIONS.map((sub) => {
              if (sub.kind === "paragraphs") {
                return (
                  <TermsSubSection key={sub.title} title={sub.title}>
                    <Paragraphs paragraphs={sub.paragraphs} />
                  </TermsSubSection>
                );
              }

              return (
                <TermsSubSection key={sub.title} title={sub.title}>
                  <div className="space-y-3">
                    {sub.items.map((text) => {
                      return (
                        <label
                          key={text}
                          className="flex items-start gap-3 cursor-default select-none"
                        >
                          <input
                            type="checkbox"
                            checked
                            disabled
                            readOnly
                            className="mt-[4px] h-3 w-3 shrink-0 appearance-none rounded-full border border-[#1B332D] bg-white checked:border-[#1B332D] checked:bg-[#1B332D] disabled:opacity-100"
                            aria-label={`Accepted: ${text}`}
                          />
                          <span className="text-[#2F2F2F] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[24px]">
                            {text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </TermsSubSection>
              );
            })}
          </AgreementSection>

          <AgreementSection title="CLIENT SERVICE AGREEMENT">
            <ClientServiceAgreementPreamble
              blocks={clientServiceAgreementPreamble}
            />
            <div className="mt-7">
              <ClientServiceAgreementOutline sections={CLIENT_SERVICE_AGREEMENT_SECTIONS} />
            </div>
          </AgreementSection>

          <div className="mt-10 border-t border-[#E9E9E9] pt-6">
            <div className="space-y-3">
              <label className="flex items-start gap-3 rounded-md bg-[#FFF6E5] px-4 py-3">
                <ConsentCheckbox
                  checked={ackRiskDisclosure}
                  onChange={(next) => setAckRiskDisclosure(next)}
                />
                <span className="text-[#2F2F2F] text-[14px] leading-[20px] sm:text-[15px] sm:leading-[22px]">
                  I/We confirm that I/We have read and understood the content of
                  this Risk Disclosure Statement and indemnity and any question(s)
                  I/ We have in relation thereto have been addressed by the
                  Portfolio Manager to my/our satisfaction
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-md bg-[#FFF6E5] px-4 py-3">
                <ConsentCheckbox
                  checked={ackTerms}
                  onChange={(next) => setAckTerms(next)}
                />
                <span className="text-[#2F2F2F] text-[14px] leading-[20px] sm:text-[15px] sm:leading-[22px]">
                  I/We confirm that I/We have read and agree to be bound by the
                  above-mentioned Terms of Use &amp; Client Service Agreement
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={submitAgreement}
              disabled={!canConfirm}
              className={[
                "mt-5 inline-flex items-center justify-center h-[40px] rounded-md px-6 text-[14px] sm:text-[15px] font-medium",
                "border border-transparent focus:outline-none focus:ring-0",
                canConfirm
                  ? "bg-[#89E081] text-[#1B332D] hover:opacity-90"
                  : "bg-[#89E081]/50 text-[#1B332D]/70 cursor-not-allowed",
              ].join(" ")}
            >
              {confirming ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <span className="mt-[3px] shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <span
        className={[
          "flex items-center justify-center h-4 w-4 rounded-[4px] border",
          "transition-colors",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1B332D]",
          checked ? "bg-[#89E081] border-[#89E081]" : "bg-white border-[#B9B9B9]",
        ].join(" ")}
        aria-hidden="true"
      >
        {checked ? (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5L4.2 8.5L11 1.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </span>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-3">
      {paragraphs.map((text, idx) => (
        <p
          key={idx}
          className="text-[#2F2F2F] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[24px] whitespace-pre-line text-justify"
        >
          {renderInlineBold(text)}
        </p>
      ))}
    </div>
  );
}

function renderInlineBold(input: string): ReactNode {
  // Supports simple inline bold via **double-asterisks**.
  // Example: "made this day of **8th of April 2026** between **John Doe** of **Lekki, Lagos**"
  const parts = input.split("**");
  if (parts.length === 1) return input;

  return parts.map((part, idx) => {
    const isBold = idx % 2 === 1;
    if (!part) return null;
    return isBold ? (
      <strong key={idx} className="font-semibold text-[#1B332D]">
        {part}
      </strong>
    ) : (
      <span key={idx}>{part}</span>
    );
  });
}

function AgreementSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6">
      <div className="bg-[#91CB7F] px-4 py-2">
        <h2 className="text-[#1B332D] font-semibold text-[15px] sm:text-[16px] tracking-wide">
          {title}
        </h2>
      </div>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function TermsSubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5">
      <h3 className="text-[#1B332D] font-semibold text-[15px] sm:text-[16px]">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

type CsaClause = {
  number: string; // e.g. "1.1", "2.3", "11.5"
  label?: string; // optional sub-sub header text beside number (e.g. a defined term)
  paragraphs: string[]; // one clause can have multiple paragraphs
};

type CsaSection = {
  number: string; // e.g. "1"..."16"
  title?: string; // e.g. "Definitions"
  paragraphs?: string[]; // optional lead-in paragraphs for the section
  clauses?: CsaClause[]; // e.g. 1.1 ... 1.25
};

type AgreementDetails = {
  email: string;
  fullName: string;
  firstName: string;
  date: string;
  address: string;
  token: string;
};

function getAgreementDetails(searchParams: URLSearchParams): AgreementDetails {
  const stored = readStoredAgreementDetails();
  const fullName = searchParams.get("fullName") ?? stored.fullName ?? "";

  return {
    email: searchParams.get("email") ?? stored.email ?? "",
    fullName,
    firstName:
      searchParams.get("firstName") ??
      stored.firstName ??
      fullName.trim().split(/\s+/)[0] ??
      "",
    date: searchParams.get("date") ?? stored.date ?? "",
    address: searchParams.get("address") ?? stored.address ?? "",
    token: searchParams.get("token") ?? stored.token ?? "",
  };
}

function readStoredAgreementDetails(): Partial<AgreementDetails> {
  try {
    const stored = sessionStorage.getItem("moneylotAgreementDetails");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function ClientServiceAgreementOutline({ sections }: { sections: CsaSection[] }) {
  return (
    <div className="mt-1 space-y-5">
      {sections.map((section) => (
        <section key={section.number}>
          <div className="flex items-start gap-3">
            <div className="w-[56px] shrink-0 text-[#1B332D] font-semibold text-[15px] sm:text-[16px]">
              {section.number}.
            </div>
            <div className="flex-1">
              {section.title ? (
                <h3 className="text-[#1B332D] font-semibold text-[15px] sm:text-[16px]">
                  {section.title}
                </h3>
              ) : null}

              {section.paragraphs?.length ? (
                <div className={section.title ? "mt-2" : undefined}>
                  <Paragraphs paragraphs={section.paragraphs} />
                </div>
              ) : null}
            </div>
          </div>

          {section.clauses?.length ? (
            <div className="mt-3 space-y-2">
              {section.clauses.map((clause, clauseIdx) => (
                <div
                  key={`${clause.number}-${clauseIdx}`}
                  className="flex items-start gap-3"
                >
                  <div className="w-[56px] shrink-0 text-[#1B332D] font-medium text-[15px] sm:text-[16px]">
                    {clause.number}
                  </div>
                  <div className="flex-1">
                    {clause.label ? (
                      <div className="text-[#1B332D] font-semibold text-[15px] sm:text-[16px]">
                        {clause.label}
                      </div>
                    ) : null}
                    <div className={clause.label ? "mt-2" : undefined}>
                      <Paragraphs paragraphs={clause.paragraphs} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

type CsaPreambleBlock =
  | { kind: "paragraphs"; paragraphs: string[] }
  | { kind: "label"; label: string }
  | {
      kind: "ordered";
      items: Array<{
        number: string;
        paragraphs: string[];
      }>;
    };

function ClientServiceAgreementPreamble({
  blocks,
}: {
  blocks: CsaPreambleBlock[];
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        if (block.kind === "label") {
          return (
            <div
              key={idx}
              className="text-[#1B332D] font-semibold text-[15px] sm:text-[16px]"
            >
              {block.label}
            </div>
          );
        }

        if (block.kind === "ordered") {
          return (
            <div key={idx} className="space-y-4">
              {block.items.map((it) => (
                <div key={it.number} className="flex items-start gap-3">
                  <div className="w-[56px] shrink-0 text-[#1B332D] font-medium text-[15px] sm:text-[16px]">
                    {it.number}.
                  </div>
                  <div className="flex-1">
                    <Paragraphs paragraphs={it.paragraphs} />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div key={idx}>
            <Paragraphs paragraphs={block.paragraphs} />
          </div>
        );
      })}
    </div>
  );
}

const RISK_DISCLOSURE_PARAGRAPHS = [
  "The statement contained herein is not intended to disclose an exhaustive list of all the risks and other significant aspects of trading in the Nigerian Capital Market.",
  "There are varying degrees of risk for different market instruments; hence you should not make any investment in the capital market unless you fully understand the nature and the extent of the risks involved. You are advised to carefully consider if an investment is appropriate for you in light of your experience, investment objectives, financial resources and all other conditions.",
  "For investments relating to securities, an investor is at risk of losing 100% of his/her investment. The prices of securities fluctuate, sometimes drastically. Due to such fluctuation, the value of a security may be become insignificant and it is likely that losses may be incurred rather than profit as a result of buying and selling securities. Fluctuations in currency rates where there is a need to convert from a currency denomination to another, may affect profit or loss in foreign currency denominated transactions. Transactions in other markets within and outside the country may also expose you to additional risks. Such markets may offer different or diminished investor protection as they operate under different rules and regulations from that which the Nigerian capital market operates under.",
  "You are further advised to seek proper clarification of all fees, commissions and charges to be incurred before sending an instruction. The total sum of all fees, commissions and charges will affect your net profit (if any) or increase your loss. Should you feel the need to make any enquiries about the likely risks associated with an intended investment, please feel free to speak with any of our Client Relationship Managers."
];

const ELECTRONIC_COMMUNICATION_PARAGRAPHS = [
  "The Client hereby consents to the use of electronic communication (which includes communication by email or telephone or facsimile).",
  "By this consent, the Client unequivocally agrees that instructions transmitted by electronic communication be binding for all purposes, including for purposes of evidence. The Client irrevocably undertakes and warrants that no demand, claim and/or action shall be instituted against the Portfolio Manager should the Client suffer any loss or liability as a result of the Client's consent to the use of electronic communication. The Client agrees to indemnify and hold the Portfolio Manager harmless against all claims, demands, actions and proceedings which may be made or instituted against the Portfolio Manager; and all liabilities, losses, damages which may be suffered by the Portfolio Manager's in connection with or arising as a result of the Client's consent to electronic communication or the Portfolio Manager's reliance on electronic communication issued from your email account or other electronic communication account indicated herein or subsequently communicated to the Portfolio Manager by the Client or the Client's nominated investment adviser or any other person the Client authorizes.",
  "The Client acknowledges that there are certain risks associated with conveying instructions via electronic means, including, but not limited to the risk of delay, non-receipt (due to technical malfunction, disruption, connectivity issues, etc. of your system or the Portfolio Manager's system or any other reason), third party interception/interference, data corruption, etc., and hereby fully waives, discharges and indemnifies the Portfolio Manager in respect of any loss or damages resulting from any of the risks identified above/ from the use of electronic communication with respect to the Client's account.",
];

const TERMS_AND_CONDITIONS_SUBSECTIONS:
  | Array<
      | {
          kind: "paragraphs";
          title: string;
          paragraphs: string[];
        }
      | {
          kind: "declaration";
          title: string;
          items: string[];
        }
    >
  = [
    {
      kind: "paragraphs",
      title: "NON- LIABILITY",
      paragraphs: ["The Portfolio Manager shall not be responsible and hereby disclaims all liabilities, including liability for all and any actual or contingent losses, liabilities, damages and costs (including, without limitation, legal costs) and any expenses of any nature whatsoever, which the Client or anyone claiming through the Client may suffer or incur as a result of or in connection with any instruction given by the Client or any person authorized by the Client, whether or not such person(s) acted beyond the scope of their mandate from the Client in giving the instruction. In no event shall the Portfolio Manager be liable to the Client for any indirect or consequential loss or for any loss occasioned by the act or omission of any third party acting under the Client's authorization."],
    },
    {
      kind: "paragraphs",
      title: "COMMUNICATION",
      paragraphs: ["The Portfolio Manager reserves the right to record any telephone conversations with the Client and the Client acknowledges that this is in line with international best practice and shall be done solely for the purpose of resolving any disputes which may arise concerning telephone advice or instructions."],
    },
    {
      kind: "paragraphs",
      title: "REGULATORY DISCLOSURE",
      paragraphs: ["The Portfolio Manager is subject to the provisions of the Money Laundering (Prohibition) Act Act in force in the Federal Republic of Nigeria, the Economic and Financial Crimes Commission (Establishment) Act 2002, the National Drug Law Enforcement Agency Act of 1995, the Consolidated SEC rules and regulations and other legislation which may be implemented from time to time to combat money laundering and other financial crimes. The Portfolio Manager is required to comply with the provisions of these legislation and all similar legislation, especially those relating to disclosure and suspicious activity reporting."],
    },
    {
      kind: "paragraphs",
      title: "THIRD PARTY PAYMENT",
      paragraphs: ["The Client agrees that payments of proceeds of investments shall only be made to the client. No third party payments shall be instructed as the Portfolio Manager is not obligated to honor such requests."],
    },
    {
      kind: "declaration",
      title: "DECLARATION",
      items: [
        "The client declares that he/she/it is the sole beneficial owner(s) of the funds/assets to be deposited with the Portfolio Manager.",
        "The client hereby acknowledges that the funds and source of such funds are legitimate and not directly or indirectly the proceeds of any unlawful activity.",
        "The client also agrees to be bound by any review, changes or amendments made to the terms and conditions stated in this document, which may occur from time to time, provided the client receives written notification of such changes via the client's agreed means of communication.",
        "The client attests that all information and documentation provided are valid and authentic and the Portfolio Manager is authorized to verify any or all of the information provided.",
      ],
    },
  ];

function buildClientServiceAgreementPreamble(
  details: AgreementDetails
): CsaPreambleBlock[] {
  const date = details.date || "________________";
  const fullName = details.fullName || "________________";
  const address = details.address || "________________";

  return [
    {
      kind: "paragraphs",
      paragraphs: [
        `This INVESTMENT MANAGEMENT AGREEMENT is made this day of **${date}** Between **${fullName}** of **${address}** (hereinafter referred to as the 'Client' which expression shall wherever the context admits include his/her heirs, legal representatives/successors-in-title and permitted assigns) of the first part.`,
      ],
    },
    { kind: "label", label: "And" },
    {
      kind: "paragraphs",
      paragraphs: [
        "BRB Financial Advisory Limited, a company duly incorporated under the Companies and Allied Matters Act 2020, LFN 2004 and registered with the Securities and Exchange Commission of Nigeria and having its registered office at No 3A Shakiru Anjorin Street Lekki Phase 1, Lagos, Nigeria. (hereinafter referred to as the 'Portfolio Manager' which expression shall wherever the context so admit include its successors-in-title) and permitted assigns of the second part.",
      ],
    },
    { kind: "label", label: "WHEREAS:" },
    {
      kind: "ordered",
      items: [
        {
          number: "1",
          paragraphs: [
            "The Portfolio Manager is a registered Fund/Portfolio Manager duly licensed and authorized by the Securities and Exchange Commission (SEC) to provide portfolio management services.",
          ],
        },
        {
          number: "2",
          paragraphs: [
            "The Client hereby appoints the Portfolio Manager to provide portfolio management services, and the Portfolio Manager has agreed to render the services    and manage the Client's investments in accordance with the Client's investment objectives.",
          ],
        },
        {
          number: "3",
          paragraphs: ["PASTE Whereas item 3 here."],
        },
      ],
    },
    { kind: "label", label: "IT IS HEREBY AGREED as follows:" },
  ];
}

const CLIENT_SERVICE_AGREEMENT_SECTIONS: CsaSection[] = [
  {
    number: "1",
    title: "Definitions",
    paragraphs: ["In this Agreement, the following words and expressions shall have the meaning hereafter assigned to them respectively, unless the context in which they are used or the meaning thereof otherwise requires:"],
    clauses: [
      {
        number: "1.11",
        // label: "“Agreement”",
        paragraphs: [
          "\"Agreement\" means this Investment Management Agreement including the Schedules and annexures attached hereto;",
        ],
      },
      {
        number: "1.12",
        // label: "“Applicable Laws”",
        paragraphs: [
          "\"Applicable Laws\" means any local statutes, rules and regulations, circular or directives issued by a regulatory authority;",
        ],
      },
      {
        number: "1.13",
        // label: "“Client”",
        paragraphs: ["\"Authorized Personnel\" means a Party's authorized signatory as stated in Section C of this document"],
      },
      {
        number: "1.14",
        // label: "…",
        paragraphs: ["\"Asset under Management\" refers to the total market value of the Client's investment managed by the Portfolio Manager on behalf of the Client;"],
      },
      {
        number: "1.15",
        // label: "…",
        paragraphs: ["“Business Day” means any day, which is not a Saturday, Sunday or Federal Government public holiday in Nigeria, in which the Portfolio Manager is open for business;"],
      },
      {
        number: "1.16",
        // label: "…",
        paragraphs: ["“Commencement Date” means the date aforementioned on which this Agreement is executed by the Client and the Portfolio Manager;"],
      },
      {
        number: "1.17",
        // label: "…",
        paragraphs: ["\"Confidential Information\" means any information of a commercial, financial or technical nature relating to the Portfolio, the Investments and the financial position of the Client which was supplied to the Portfolio Manager by the Client or the Portfolio Manager may receive through the normal course of the performance of the its services under this Agreement;"],
      },
      {
        number: "1.18",
        // label: "…",
        paragraphs: ["“Investment Guidelines” means the Client's investment objectives for the Portfolio as set out in Clause 8 of this Agreement or as otherwise agreed to in writing between the Portfolio Manager and the Client from time to time;"],
      },
      {
        number: "1.18",
        // label: "…",
        paragraphs: ["“Investment” means the"],
      },
      {
        number: "1.19.1",
        // label: "…",
        paragraphs: ["bonds, shares, money-market instruments, Real Estate, cash and near cash; and "],
      },
      {
        number: "1.19.2",
        // label: "…",
        paragraphs: ["such other assets, dividends, interest, cash accruals"],
      },
      {
        number: "1.19.3",
        // label: "…",
        paragraphs: ["and money subsequently acquired or held by the Portfolio Manager on behalf of the Client;"],
      },
      {
        number: "1.20",
        // label: "…",
        paragraphs: ["\"Manage\" means any act performed by the Portfolio Manager in connection with the: purchasing, selling, reinvesting, or otherwise managing of the Investments;"],
      },
      {
        number: "1.20.1",
        // label: "…",
        paragraphs: ["buying, selling, administering and/or holding of Investments on behalf of the Client; or"],
      },
      {
        number: "1.20.2",
        // label: "…",
        paragraphs: ["receiving, payment or investment of money, including interest and dividends, in respect of a transaction entered into and/or the holding of Investments on behalf of the Client;"],
      },
      {
        number: "1.21",
        // label: "…",
        paragraphs: ["\"Portfolio\" means the grouping of the total assets belonging to the Client and also managed by the Portfolio Manager pursuant to this Agreement. It also includes the Client's funds;"],
      },
      {
        number: "1.22",
        // label: "…",
        paragraphs: [
          "\"Quarter\" means every calendar quarter of three months i.e. March, June, September and December, provided that the first quarter from the date of commencement may be for a period less than 3 months;",
        ],
      },
      {
        number: "1.23",
        // label: "…",
        paragraphs: [
          "\"Half year\" or \"Semi-annual\" means every calendar half year of six months i.e. June and December provided that the first half year from the date of commencement may be for a period less than 6 months;",
        ],
      },
      {
        number: "1.24",
        // label: "…",
        paragraphs: ["“SEC” means the Securities and Exchange Commission of Nigeria;"],
      },
      {
        number: "1.24",
        // label: "…",
        paragraphs: ["“Termination Date” means the date upon which this Agreement is terminated in accordance with the provisions of Clause 16;"],
      },
      {
        number: "1.25",
        // label: "…",
        paragraphs: ["“SEC” means the Securities and Exchange Commission of Nigeria;"],
      },
    ],
  },
  {
    number: "2",
    title: "Appointment of Portfolio Manager",
    clauses: [
      {
        number: "2.1",
        paragraphs: ["The Client hereby appoints the Portfolio Manager to provide Portfolio Management Services with effect from the commencement date in accordance with the terms and conditions set out herein."],
      },
      {
        number: "2.2",
        paragraphs: ["The Portfolio Manager agrees to provide the Portfolio Management Services which may include, but not limited to, investment consultancy, renewing or readjusting of the Client's portfolio and buying or selling of securities."],
      },
      {
        number: "2.2",
        paragraphs: ["Parties agree that in the event of any conflict between this Investment Management Agreement and any applicable law, the applicable law shall prevail."],
      },
    ],
  },
  {
    number: "3",
    title: "Authorization of Portfolio Manager",
    clauses: [
      {
        number: "3.1",
        paragraphs: [
          "The Client hereby authorizes the Portfolio Manager to do all such acts on behalf of the Client in view of and in line with the Client's investment objectives and instructions, for the purpose of rendering the Services contemplated here.",
        ],
      },
    ],
  },
  {
    number: "4",
    title: "Scope of Appointment",
    clauses: [
      {
        number: "4.1",
        paragraphs: ["The Portfolio Manager shall:"],
      },
      {
        number: "4.1.1",
        paragraphs: [
          "Manage the Client's Portfolio in good faith and with all the due care, diligence and skill that can reasonably be expected of an expert fund/portfolio manager;",
        ],
      },
      {
        number: "4.1.2",
        paragraphs: ["Act in the Client's best interests at all times;"],
      },
      {
        number: "4.1.3",
        paragraphs: [
          "Appoint an officer, who shall be available at all reasonable times to answer any queries raised by the Client or advise the Client on any matter relating to the Client's Portfolio;",
        ],
      },
      {
        number: "4.2",
        paragraphs: [
          "The Client accepts that all directions, instructions and/or notices from the Client to the Portfolio Manager shall be in writing. The Portfolio Manager shall be fully protected in relying upon any direction, notice, or instruction without verification until it has been duly advised in writing of any changes therein.",
        ],
      },
      {
        number: "4.3",
        paragraphs: [
          "The Portfolio Manager shall endeavour to process all Account transactions in a timely manner, but does not warrant or represent that any such transaction shall be effected on the same day as discussed.",
        ],
      },
      {
        number: "4.4",
        paragraphs: [
          "The Client hereby authorizes the Portfolio Manager to do all such acts on behalf of the Client as the Portfolio Manager may consider necessary or advisable for the purposes of rendering the Services contemplated herein.",
        ],
      },
      {
        number: "4.5",
        paragraphs: [
          "The objective of this Agreement shall be to invest for and on behalf of the Client. The Portfolio Manager will provide the Client with investment recommendations that it reasonably considers are consistent with the Client's agreed Investment Objectives. This is subject to any restrictions in the Mandate or which otherwise apply to the provision of the Portfolio Manager's services under this Agreement.",
        ],
      },
      {
        number: "4.6",
        paragraphs: [
          "The Services and the provisions of this Agreement shall be subject to the Applicable Laws in force from time to time and notwithstanding anything contained in this Agreement. The Portfolio Manager shall not be required or entitled to make any investments or otherwise deal with the Assets or render the Services in a manner that is contrary to the Applicable Laws in force at the relevant time.",
        ],
      },
      {
        number: "4.7",
        paragraphs: [
          "The Portfolio Manager will keep the Client's Assets under review in order to ensure that the Client's Assets remain invested in a manner that is consistent with the Client's agreed Investment Objectives.",
        ],
      },
      {
        number: "4.8",
        paragraphs: [
          "The Portfolio Manager will make any necessary strategic or stock selection recommendations to the Client when the Portfolio Manager believes that the Client should make changes to the contents of the Client's portfolio of Assets.",
        ],
      },
      {
        number: "4.9",
        paragraphs: [
          "The Client hereby agrees and undertakes that until the termination of this Agreement and the receipt of a no objection statement from the Portfolio Manager on its behalf:",
        ],
      },
      {
        number: "4.9.1",
        paragraphs: [
          "the Client shall not enter into any agreement with any other intermediary or give any instructions to an intermediary in relation to the Portfolio or this Agreement; and",
        ],
      },
      {
        number: "4.9.2",
        paragraphs: [
          "the Client shall not pledge, lend, create any charge, lien or other encumbrance of any nature over the Assets in the Portfolio or otherwise deal with the Assets in any manner whatsoever.",
        ],
      },
      {
        number: "4.10",
        paragraphs: [
          "For the purpose of discharging any of the duties, obligations and functions (whether under this Agreement or under the Power of Attorney), of the Portfolio Manager, the Client hereby empowers the Portfolio Manager to act through any of its officers, employees or representatives or other person specifically authorized by the Portfolio Manager, and the Portfolio Manager is empowered to delegate the performance of its",
        ],
      },
      {
        number: "4.11",
        paragraphs: [
          "The Portfolio Manager shall act in a fiduciary capacity and shall disclose all conflicts of interests as and when they arise and where appropriate, obtain the Client's consent for such conflicts of interests",
        ],
      },
    ],
  },
  {
    number: "5",
    title: "Accounting and Reporting Requirements",
    clauses: [
      {
        number: "5.1",
        paragraphs: [
          "The Portfolio Manager undertakes to keep accounting records for the Client's Portfolio and shall be obliged to:",
        ],
      },
      {
        number: "5.1.1",
        paragraphs: [
          "Maintain adequate books and records of account in relation to its obligations under this Agreement;",
        ],
      },
      {
        number: "5.1.2",
        paragraphs: [
          "Allow the Client or the Authorized Signatory reasonable access to such books of accounts and other records relating to the Client's portfolio.",
        ],
      },
      {
        number: "5.1.3",
        paragraphs: [
          "Provide the Client, on or before the 10th (tenth) working Day of a new quarter, with a comprehensive investment report in respect of the preceding quarter, reflecting at least the details of:",
          "a) All Investments held at the end of the preceding quarter, including the current market value of each Investment;\n b) Any income that accrued to, or for the benefit of, the Client during the preceding quarter",
        ],
      },
      {
        number: "5.1.4",
        paragraphs: [
          "Notwithstanding the provisions of Clause 5.1.3, the Portfolio Manager shall ensure that the Client receives at the end of every month, a Statement of Account setting out the current asset allocation and performance of the Investment Portfolio. The Portfolio Manager shall also provide the Client with any other information with regards to the Investment Portfolio and management of the Investment Portfolio as the Client may reasonably require.",
        ],
      },
      {
        number: "5.1.5",
        paragraphs: [
          "Retain the accounting records and any supporting vouchers, notes or documents for a minimum period of 5 (five) years, and allow them to be inspected or reviewed by the Client or the Client's Authorized Signatory or independent auditors whenever necessary for audit and/or control purposes.",
        ],
      },
    ],
  },
  {
    number: "6",
    title: "Withdrawals or Deposits by the Client",
    clauses: [
      {
        number: "6.1",
        paragraphs: [
          "The Client shall give the Portfolio Manager at least five (5) business days' written notice in the event that the Client wishes to make a cash withdrawal from the Portfolio.",
        ],
      },
      {
        number: "6.2",
        paragraphs: [
          "Upon receipt of the Client's written notice, the Portfolio Manager shall, provided it is reasonably practical to do so, pay any amount which is to be paid as a result of a full or partial withdrawal, to the Client's account within five (5) business days of receipt of notice, taking the following factors, inter alia, into account:",
        ],
      },
      { number: "6.2.1", paragraphs: ["The prevailing market conditions;"] },
      { number: "6.2.2", paragraphs: ["The size of the withdrawal; and"] },
      { number: "6.2.3", paragraphs: ["The nature of the investment being redeemed."] },
      {
        number: "6.3",
        paragraphs: [
          "The Portfolio Manager may refuse to acknowledge any notice for a full or partial withdrawal from the Client unless the Portfolio Manager has verified that such notice has been signed by the Client.",
        ],
      },
      {
        number: "6.4",
        paragraphs: [
          "The Portfolio Manager shall pay into the Client's registered bank account any partial or full withdrawal made by the Client.",
        ],
      },
      {
        number: "6.5",
        paragraphs: [
          "The Client shall notify the Portfolio Manager by telephone or email within twenty four (24) hours prior to making a cash deposit in the Portfolio Manager's specified bank account for the purposes of the investment. Telephone notification must be confirmed in writing by the Client or authorized signatory before close of business on the day the cash deposit was made. The Portfolio Manager will start managing the new cash in accordance with the Investment Guidelines after 24 (twenty four) hours of becoming aware that the cash had been deposited, if payment is made through the Portfolio Manager's designated Account.",
        ],
      },
    ],
  },
  {
    number: "7",
    title: "Indemnity",
    paragraphs: [
      "The Client hereby indemnifies and holds harmless the Portfolio Manager from, and against any liability in respect of any losses, claims, costs and expenses which may arise or be incurred in connection with this Agreement, Provided that this indemnity will not apply if the Portfolio Manager acted negligently, fraudulently, or in any way that contravened the provisions of this Agreement and applicable laws.",
      "The Portfolio Manager acting in good faith, shall not be liable for any action, omission, investment recommendation/decision, or loss in connection with the acts or omissions of other professionals or third party service providers recommended to the Client by the Portfolio Manager.",
    ],
  },
  {
    number: "8",
    title: "Confidentiality",
    paragraphs: [
      "The Portfolio Manager warrants that it shall treat all information with respect to the Investment Portfolio with the utmost confidentiality. Any confidential information about the Client obtained in the course of the Portfolio Manager's engagement shall remain and be utilized exclusively for the Client's investment objective. Where the Portfolio Manager is compelled by applicable regulatory and/or fiscal authorities and any other valid order carrying the force of law to disclose any confidential information, the Portfolio Manager shall notify the Client before making such disclosure.",
    ],
  },
  {
    number: "9",
    title: "Force Majeure",
    clauses: [
      {
        number: "9.1",
        paragraphs: [
          "The Portfolio Manager shall not be liable for damages for any delay or failure to perform any of its obligations hereunder if such delay or failure is caused by an event of force majeure such as but not limited to riots, strikes, work stoppages, acts of God, acts of war or revolution, earthquakes, epidemics or other circumstances which are beyond the reasonable control of the Portfolio Manager. In addition, the Portfolio Manager shall not be liable for any loss arising to assets held by it on behalf of the Client where such losses are the result of government restrictions, exchange or market rulings or suspension of trading",
        ],
      },
      {
        number: "9.2",
        paragraphs: [
          "The Parties agree that, in the event that the Force Majeure occurs as contemplated herein, either Party may be entitled to terminate this Agreement in accordance with the provisions of Clause 16.",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Breach",
    clauses: [
      {
        number: "10.1",
        paragraphs: [
          "Should either Party ('the defaulting party') breach any of the provisions of this Agreement and the breach is material; and/or the defaulting party fails to remedy the breach within 10 (ten) Business Days, or such other reasonable period, after the receipt of a written notice from the other Party ('the non-defaulting party'), requiring it to do so, then the non-defaulting party shall be entitled, without prejudice to any remedies which it may otherwise have in terms of this Agreement or in law, to immediately terminate this Agreement on the occurrence of the material breach or on the expiry of the 10 (ten) Business Day period as the case may be.",
        ],
      },
      {
        number: "10.2",
        paragraphs: [
          "The provisions in this clause shall not apply in the event that the breach by the defaulting party is as a result of a Force Majeure, and the defaulting party shall not be liable for any loss or damage whether general, special or consequential, which the other party may suffer due to or resulting from such delay or failure.",
        ],
      },
    ],
  },
  {
    number: "11",
    title: "Termination",
    clauses: [
      {
        number: "11.1",
        paragraphs: [
          "This Agreement shall run for a period of 1 (one) year ('Initial Term'), and shall automatically renew for additional periods of one (1) year each subject to additional terms (if any) to be mutually agreed upon by the Parties.",
        ],
      },
      {
        number: "11.2",
        paragraphs: [
          "This Agreement will be terminated by either party giving three (3) months written notice to the other, which written notice must be signed by the terminating party. Upon the termination of this Agreement, the Portfolio Manager will have no obligation to recommend or take any action with regard to the securities, cash or other investments in the Client's portfolio and will refund any unearned fees.",
          "Termination of this Agreement will not affect:",
        ],
      },
      {
        number: "11.2.1",
        paragraphs: [
          "the validity of any action previously taken by the Portfolio Manager under this Agreement;",
        ],
      },
      {
        number: "11.2.2",
        paragraphs: [
          "liabilities or obligations of the parties from transactions initiated before termination of this Agreement; or",
        ],
      },
      {
        number: "11.2.3",
        paragraphs: [
          "the Client's obligation to pay any outstanding fees (prorated through the date of termination).",
        ],
      },
      {
        number: "11.3",
        paragraphs: [
          "At the end of the notice period, the Agreement shall terminate forthwith, and the Portfolio Manager shall be entitled to debit the Investment Portfolio of the pro-rated Management Fee that had been earned and fallen due at the date of termination of the Agreement.",
        ],
      },
      {
        number: "11.4",
        paragraphs: [
          "Upon termination of the Agreement, the return on the Portfolio from the day immediately subsequent to the end of the most recently concluded quarterly investment period to the date of the determination of the Agreement ('the Final Period') shall be calculated and adjusted to determine the amount that represents the actual return on the Investment Portfolio (Actual Return on Investment Period, ARIP) and whether it exceeds the agreed expected return during the Final Period. The Portfolio Manager shall where the ARIP for the Final Period exceeds the agreed benchmark return be entitled to debit in addition to any other amount that may be due to it as its Incentive Fee.",
        ],
      },
      {
        number: "11.5",
        paragraphs: [
          "Upon termination of this Agreement for any reason whatsoever, the Portfolio Manager shall hand over to the Client all securities and investments constituting the Portfolio as at the date on which the Agreement came to an end as well as any funds that may be standing to the credit of the Nominee Account (all of which securities investments and funds are jointly and severally called 'the End - Date Portfolio'). The End - Date Portfolio shall represent the sum total of the assets held by the Portfolio Manager on the Client's behalf. Upon receipt by the Client of the End - Date Portfolio, the Portfolio Manager shall be discharged of all its obligations to the Client in respect of the Portfolio and shall thereafter cease to be liable for any subsequent diminution in the value of the Portfolio.",
        ],
      },
    ],
  },
  {
    number: "12",
    title: "Agreement",
    paragraphs: [
      "This Agreement represents the entire agreement between the parties and supersedes and replaces, in its entirety, all previous discussions in relation to the services contemplated herein and investment management services agreement(s) between the parties.",
    ],
  },
  {
    number: "13",
    title: "Assignment",
    paragraphs: [
      "This Agreement may not be assigned by either the Client or the Portfolio Manager without the prior consent of the other party.",
    ],
  },
  {
    number: "14",
    title: "Amendments",
    paragraphs: [
      "The Portfolio Manager may amend this Agreement upon written notification to the Client. Unless the Client notifies the Portfolio Manager to the contrary, in writing, the amendment shall become effective thirty (30) days from the date of notice or as otherwise agreed.",
    ],
  },
  {
    number: "15",
    title: "Severability",
    paragraphs: [
      "Any term or provision of this Agreement which is deemed invalid or unenforceable by any court of competent jurisdiction shall be ineffective to the extent of such invalidity or unenforceability without rendering invalid or unenforceable the remaining terms or provisions of this Agreement.",
    ],
  },
  {
    number: "16",
    title: "Governing Law and Dispute Resolution",
    paragraphs: [
      "This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. If any dispute arises in connection with this agreement, the parties will attempt to settle it amicably by negotiation first, upon written notice from any party requesting a meeting to settle the dispute. If the dispute is not settled amicably within a period of seven (7) days from the receipt of such written notice, then any Party to the dispute may refer the dispute to mediation in accordance with the Lagos MultiDoor Courthouse Law (LMDC) 2007 or any replacement thereof. To initiate the mediation a party must give notice in writing to the other party to the dispute requesting a mediation. A copy of the request should be sent to the LMDC.",
      "The mediation will start not later than ten (10) days after the date of the notice and the mediation proceedings shall be conducted at the Lagos Multi-door Court House. The language to be used throughout the proceedings shall be English. The resulting award shall be final and binding on the Parties and shall be in lieu of any other remedy. Parties agree that the mediation session shall not exceed two (2) months after which the dispute shall be referred to Arbitration.",
      "In the event that the dispute is referred to Arbitration, the Arbitration shall be conducted in Lagos state at the Lagos State Multidoor court House, Igbosere, Lagos. The Arbitrator shall be mutually appointed by parties failing which the Multi-door Court House shall appoint an Arbitrator.",
    ],
  },
];

export default ClientServiceAgreement;
