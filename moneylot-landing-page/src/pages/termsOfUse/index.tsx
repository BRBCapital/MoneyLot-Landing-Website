
import LegalPage from "../../components/privacyTermsWrapper";
import { imagesAndIcons } from "../../constants/imagesAndIcons";
import SectionFive from "../homepage/sectionFive";
import Footer from "../homepage/footer";

const TermsOfUse = () => {
  return (
    <div>
      <LegalPage
        headerImage={imagesAndIcons.termsOfUseHeader}
        // lastUpdated="These terms outline the rules and guidelines for using our platform"
      >
        <p className="text-xl">LAST UPDATED JULY 10TH, 2025</p>

        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          Introduction
        </p>

        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          This document sets out the comprehensive Terms and Conditions
          governing your use of the financial services provided through
          Moneylot, a digital platform operated by BRB Financial Advisory
          Limited. These services include savings, investments, and loans. The
          Terms and Conditions apply to all related transactions, including but
          not limited to account creation, deposits, withdrawals, loan
          applications, disbursements, repayments, and investment activities
          conducted through our digital platforms and mobile applications. By
          registering on Moneylot and using any of our services, you acknowledge
          that you have read, understood, and agreed to be bound by the terms
          set forth in this user agreement. We may update this User Agreement
          and the associated policies from time to time. Unless otherwise
          indicated, any revised version will take effect upon publication.
          Where changes materially reduce your rights or impose additional
          obligations, we will give you at least 21 days’ prior notice
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          By continuing to use our services after these changes take effect, you
          confirm your acceptance of and agreement to the revised terms. If you
          do not accept the updated terms and conditions, you must discontinue
          use and exit the application immediately.We also reserve the right to
          terminate our relationship with you upon notice, should we determine
          that you have breached any of these terms. In such an event, a minimum
          of 21 days’ notice will be provided.
        </p>

        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          1. Eligibility Criteria
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          1.1. You must be at least 21 years old, mentally sound, and either
          employed by a reputable organisation or have a verifiable and legal
          source of income.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          1.2. You must possess a valid Bank Verification Number (BVN) and
          provide accurate personal and financial information.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          1.3. You confirm that all information provided is true, current, and
          complete. Failure to provide correct details may result in
          disqualification or termination of services.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          2. Savings Services
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          2.1. Savings accounts may be opened and maintained via Moneylot’s
          digital platform with a minimum initial deposit as specified on the
          platform.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          2.2. Interest rates on savings are subject to change based on market
          conditions and will be communicated to you via digital channels.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          2.3. Withdrawals from savings accounts can be made subject to any
          applicable minimum balance requirements and notice periods, if any.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          2.4. You authorise Moneylot to debit or credit your savings account as
          per transactions initiated through the platform.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          2.5. Moneylot reserves the right to suspend or close savings accounts
          in cases of suspected fraud, illegal activity, or breach of these
          terms.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          2.6. Interest accrued on savings is calculated as specified and
          credited to your account periodically.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          3. Investment Services
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          3.1. Investment products offered on Moneylot may include fixed income,
          mutual funds, stocks, or other instruments as made available on the
          platform.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          3.2. Investments are subject to market risks, and Moneylot does not
          guarantee returns on any investment product.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          3.3. You acknowledge that investments are made at your own risk and
          that past performance is not indicative of future results.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          3.4. Detailed terms, including minimum investment amounts, lock-in
          periods, and exit procedures, will be provided for each investment
          product.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          3.5. You authorise Moneylot to execute transactions on your behalf
          related to your investment portfolio according to your instructions.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          3.6. Fees related to investment management, entry, exit, or
          administration will be disclosed prior to investment and may be
          amended with due notice.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          4. Loan Application and Disbursement
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          4.1. The loan application process will be conducted digitally.
          Approval is subject to satisfactory credit assessment using credit
          bureau reports and other third-party information.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          4.2. Loan amounts will be disbursed to the bank account you provide
          upon approval.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          4.3. Loan details, including amount, interest rate, repayment
          schedule, and tenor, will be communicated via digital means before
          disbursement.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          4.4. Loan disbursement is subject to fund availability and compliance
          with applicable regulations.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          5. Loan Tenor and Interest Rates
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          5.1. Interest may be charged daily or monthly at flat or dynamic rates
          depending on the loan product.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          5.2. Interest rates may be reviewed in line with market conditions,
          with changes communicated at least 15 days in advance.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          5.3. Early repayment is permitted and may reduce the total interest
          payable. Please contact Moneylot to confirm outstanding obligations
          before early repayment.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          6. Fees and Charges
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          6.1. Applicable fees may include processing fees, transaction fees,
          default penalties, management fees (for investments), and other
          charges as disclosed during service usage.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          6.2. Penalty fees for late loan repayments may be up to 1% daily or 1%
          monthly depending on the product type
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          6.3. Fees may be revised with prior notice to users.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          7. Repayment Structure (Loans)
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          7.1. Repayments shall be made as per the agreed schedule via direct
          debit, standing order, payroll deduction, or debit card.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          7.2. You authorise Moneylot to debit amounts due from your designated
          bank accounts until full repayment.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          7.3. You agree not to alter bank accounts or obstruct automated
          payments during the loan period.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          7.4. Refunds for overpayments or duplicates will be processed after
          verification.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          8. Use of Loan
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          8.1. Loans are to be used for lawful and disclosed purposes only.
          Misuse may result in immediate repayment demand.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          8.2. Fraudulent use of loan funds will entitle Moneylot to demand full
          and immediate repayment.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          9. Default and Recovery (Loans)
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          9.1. Default occurs if you miss scheduled payments, provide false
          information, or breach security terms.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          9.2. Moneylot may:
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          9.2.1. Report defaults to credit bureaus and regulators.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          9.2.2. Activate Global Standing Instructions (GSI) for account debits.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          9.2.3. Engage licensed recovery agents.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          9.2.4. Initiate legal proceedings.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          9.3. You will indemnify Moneylot for related legal and recovery costs.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          10. Credit Reference and Consent (Loans)
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          10.1. You consent to credit profile checks with licensed bureaus for
          loan processing.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          10.2.  Information may be shared with other financial institutions.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          10.3. Confidentiality rights are waived for disclosures under this
          clause.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          11.  Communication and Notices
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          11.1. Communications will be via email, SMS, in-app messages, or
          postal mail.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          11.2. Notices are deemed received:
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          11.2.1. On the second business day after mailing.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          11.2.2. Upon transmission completion for electronic messages.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          11.2.3. Immediately for app notifications.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          12.   Indemnity and Representations
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          12.1. You represent all information is accurate and you are not
          insolvent or legally restricted.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          12.2. You indemnify Moneylot against liabilities arising from breaches
          or unauthorised acts.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          12.3. Unauthorised use of third-party debit cards on your account is
          prohibited and subject to liability.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          13.  Termination and Closure
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mt-2">
          13.1. Agreements remain binding until all obligations are fulfilled.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          13.2. In cases of death or permanent disability, outstanding loan
          balances may be deducted from estates or benefits.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          13.3. Moneylot may terminate agreements due to fraud,
          misrepresentation, or prolonged non-payment.
        </p>
        <p className="mt-6 text-[19px]" style={{ fontWeight: 700 }}>
          14.  Governing Law and Dispute Resolution
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify">
          14.1. These terms are governed by the laws of the Federal Republic of
          Nigeria.
        </p>
        <p className="text-[17px] text-[#979797] font-normal text-justify mb-6">
          14.2. Disputes should first be raised in writing. If unresolved, they
          shall proceed to mediation, then Nigerian courts as a last resort.
        </p>

        {/* Continue filling sections */}
      </LegalPage>
      <SectionFive />
      <Footer />
    </div>
  );
};

export default TermsOfUse;
