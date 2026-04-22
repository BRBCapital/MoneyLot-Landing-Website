import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  name: string;
  faqs: FAQItem[];
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultOpenIndexByCategory: Record<string, number> = {
    // Figma frames show Q2 opened for these categories
    "account-onboarding": 1,
    "account-verification": 1,
  };

  const pillWidthClassById: Record<string, string> = {
    // Desktop pill widths for the left column (rows: 2, 3, 2)
    // Reduced ~30% to prevent overflow inside the 46% left column
    // Bumped ~10% from the reduced sizes (still safe from overflow)
    general: "md:w-[120px]",
    "account-onboarding": "md:w-[230px]",
    "account-verification": "md:w-[220px]",
    savings: "md:w-[135px]",
    investment: "md:w-[150px]",
    "investment-advance": "md:w-[230px]",
    "support-help": "md:w-[200px]",
  };

  const faqCategories: FAQCategory[] = [
    {
      id: "general",
      name: "General",
      faqs: [
        {
          question: "What is Moneylot?",
          answer:
            "Moneylot is a simple and secure wealth management platform that helps users save, invest, and access financial assistance.",
        },
        {
          question: "Is Moneylot safe to use?",
          answer:
            "Yes, Moneylot is safe to use. We are SEC Licensed Fund/Portfolio Manager, NDPR Certified, ISO Certified, and AML/CFT Compliant. Your data and funds are protected with industry-standard security measures.",
        },
      ],
    },
    {
      id: "account-onboarding",
      name: "Account Onboarding",
      faqs: [
        {
          question: "Who can use Moneylot?",
          answer:
            "Moneylot offers both Personal accounts for individuals looking to grow their wealth and Business accounts for entrepreneurs needing smart funding tools.",
        },
        {
          question: "How do I create a Moneylot account?",
          answer:
            "Creating a Moneylot account is simple. Join the waitlist and we’ll notify you once onboarding is available, then follow the guided setup and verification steps.",
        },
      ],
    },
    {
      id: "account-verification",
      name: "Account Verification",
      faqs: [
        {
          question: "Why do I need to complete KYC verification?",
          answer:
            "KYC is required to comply with regulatory standards and to enable access to savings, investments, withdrawals, and investment advances.",
        },
        {
          question: "What documents do I need for KYC?",
          answer:
            "You’ll typically need a valid government-issued ID (e.g., National ID, Driver’s License, or International Passport) and proof of address.",
        },
      ],
    },
    {
      id: "savings",
      name: "Savings",
      faqs: [
        {
          question: "What savings options are available on Moneylot?",
          answer:
            "Moneylot offers smart savings options to help you save with purpose. These plans make it easy to stay disciplined, reach your goals, and grow your money.",
        },
        {
          question: "What Savings plans does Moneylot offer?",
          answer:
            "• My Moneylot — Your default plan, created automatically when you sign up. It’s flexible: add money anytime, use automatic contributions, and withdraw during designated periods. It earns daily interest.\n\n• Regular Savings — A goal-based plan for targets like rent, travel, school fees, or business expansion. You commit to a fixed saving period; funds stay locked until maturity in exchange for higher interest rates.\n\n• Emergency Savings — For unexpected expenses. Save and withdraw at any time while still earning interest. More than four withdrawals in a month means interest for that month is forfeited from the fifth withdrawal onward.",
        },
        {
          question: "What is Quick Save?",
          answer:
            "Quick Save lets you instantly save funds into a selected savings plan using your preferred payment method.",
        },
        {
          question: "Can I automate my savings?",
          answer:
            "Yes. Auto Save lets you set an amount to be saved automatically at scheduled intervals so your savings happen without manual effort.",
        },
      ],
    },
    {
      id: "investment",
      name: "Investment",
      faqs: [
        {
          question: "What types of investments does Moneylot offer?",
          answer:
            "Moneylot Investments make wealth growth simple and accessible. With clear options and built-in transparency, users can invest confidently at their own pace. There are three types of investments available: short-term, mid-term, and long-term investments.\n\n• Short-Term Investments (up to 90 days) — Flexible plans designed for quick returns over a shorter period.\n\n• Mid-Term Investments (up to 180 days) — Balanced plans that offer stability with moderate returns. Ideal for mid-range goals such as tuition, projects, or business cycles.\n\n• Long-Term Investments (9–12 months) — Fixed plans with tenors from 9 months upward and higher returns. Offers higher returns than savings, simplified investing for first-timers, and fixed tenor options.",
        },
        {
          question: "Can I reinvest?",
          answer:
            "Yes. You can reinvest your invested capital once your investment tenor is complete and the investment has matured.",
        },
      ],
    },
    {
      id: "investment-advance",
      name: "Investment Advance",
      faqs: [
        {
          question: "What is the benefit of Investment Advance?",
          answer:
            "Investment Advance allows you to access instant funds based on your active savings and investment balance.",
        },
        {
          question: "How much can I access through Investment Advance?",
          answer:
            "As an eligible user, you can access up to 60% of the value of your active savings or investments.",
        },
        {
          question: "How do I apply for an Investment Advance?",
          answer:
            "Select Investment Advance from the dashboard, review your eligible amount, accept the terms, and proceed. Funds are disbursed to your linked withdrawal account.",
        },
        {
          question: "How do I repay my Investment Advance?",
          answer:
            "Repayments can be made manually when due or automatically deducted from savings or investment balances at maturity.",
        },
        {
          question: "What happens if I miss a repayment?",
          answer:
            "You will receive reminders. Missed repayments may attract penalties according to the agreed terms.",
        },
      ],
    },
    {
      id: "support-help",
      name: "Support & Help",
      faqs: [
        {
          question: "How can I contact the Moneylot support team?",
          answer:
            "You can reach the Moneylot support team through the following channels:\n\n• In-app chat\n• Email: hello@moneylot.com\n• Phone: +2348101207356\n• Office visit: Plot 3A, Shakiru Anjorin Street, Lekki Phase 1, Lagos State, Nigeria",
        },
      ],
    },
  ];

  const activeCategoryData = faqCategories.find(
    (cat) => cat.id === activeCategory
  );

  const faqs = activeCategoryData?.faqs ?? [];

  const leftPillRows: Array<Array<(typeof faqCategories)[number]["id"]>> = [
    ["general", "account-onboarding"],
    ["account-verification", "savings", "investment"],
    ["investment-advance", "support-help"],
  ];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    const next = faqCategories.find((c) => c.id === id);
    if (!next || next.faqs.length === 0) {
      setOpenIndex(null);
      return;
    }

    const preferred = defaultOpenIndexByCategory[id] ?? 0;
    setOpenIndex(preferred < next.faqs.length ? preferred : 0);
  };

  const toggleOpen = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
          {/* LEFT */}
          <div className="w-full md:basis-[46%] md:flex-none">
            <h2 className="text-[#1B332D] font-semibold text-[44px] leading-[52px] md:text-[64px] md:leading-[72px]">
              FAQs
            </h2>
            <p className="mt-4 text-[#8A8A8A] text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] max-w-[340px]">
              Everything you need to know about how Moneylot works, manage your
              savings, and get help when you need it.
            </p>

            {/* category pills */}
            <div className="mt-8 space-y-4">
              {leftPillRows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-wrap md:flex-nowrap gap-4 max-w-full"
                >
                  {row.map((id) => {
                    const category = faqCategories.find((c) => c.id === id);
                    if (!category) return null;
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={[
                          "w-auto",
                          pillWidthClassById[category.id] ?? "",
                          "h-[44px] md:h-[48px] rounded-full px-5 md:px-6",
                          "text-[13px] md:text-[14px]",
                          "border-none focus:outline-none focus:ring-0",
                          "transition-colors duration-150",
                          isActive
                            ? "bg-[#89E081] text-[#1B332D] font-medium"
                            : "bg-[#F3F3F3] text-[#1B332D] font-normal hover:bg-[#EDEDED]",
                        ].join(" ")}
                      >
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:basis-[54%] md:flex-none md:pr-6">
            {/* Accordion */}
            {faqs.length > 0 ? (
              <div>
                {faqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={`${activeCategory}-${idx}`}
                      className="border-b border-[#E9E9E9] py-6"
                    >
                      <button
                        onClick={() => toggleOpen(idx)}
                        className="w-full flex items-center justify-between gap-6 text-left bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                        aria-expanded={isOpen}
                      >
                        <span className="text-[#1B332D] font-semibold text-[20px] leading-[26px] md:text-[24px] md:leading-[30px]">
                          {faq.question}
                        </span>
                        <span className="text-[#1B332D] text-[26px] md:text-[28px] leading-none select-none">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="mt-3 text-[#8A8A8A] text-[16px] leading-[23px] md:text-[18px] md:leading-[26px] whitespace-pre-line">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border-b border-[#E9E9E9] py-6">
                <p className="text-[#8A8A8A] text-[14px] leading-[20px]">
                  FAQs for this category are coming soon.
                </p>
              </div>
            )}

            {/* Contact Support Card */}
            <div
              className="mt-10 rounded-2xl bg-[#F3F3F3] px-6 py-6 md:px-8 md:py-7"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(27,51,45,0.03) 0px, rgba(27,51,45,0.03) 1px, transparent 1px, transparent 18px)",
              }}
            >
              <h3 className="text-[#1B332D] font-semibold text-[18px] leading-[24px] md:text-[22px] md:leading-[28px]">
                Still have questions?
              </h3>
              <p className="mt-2 text-[#8A8A8A] text-[15px] leading-[22px] md:text-[17px] md:leading-[24px] max-w-[520px]">
                Contact our support team and we will make sure everything is
                clear and intuitive for you!
              </p>

              <a
                href="mailto:hello@moneylot.com"
                className="mt-5 inline-flex items-center justify-center h-[42px] md:h-[48px] rounded-full bg-[#89E081] px-7 text-[13px] md:text-[14px] font-medium text-[#1B332D] hover:opacity-90 transition-opacity border-none outline-none focus:outline-none focus:ring-0"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
