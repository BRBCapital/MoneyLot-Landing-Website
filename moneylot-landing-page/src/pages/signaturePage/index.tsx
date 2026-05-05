import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import sidebar from "../../assets/sidebar.png";
import backgroundImageWeb from "../../assets/backgroundImageWeb.png";
import FileMagnifyingGlass from "../../assets/FileMagnifyingGlass.png";
import SealCheck from "../../assets/SealCheck.png";
import Signature from "../../assets/Signature.png";

type Step = {
  id: string;
  title: string;
  icon: string;
  active?: boolean;
};

const SignaturePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const agreementDetails = useMemo(() => {
    const fullName = searchParams.get("fullName") ?? "";
    return {
      email: searchParams.get("email") ?? "",
      fullName,
      firstName: fullName.trim().split(/\s+/)[0] ?? "",
      date: searchParams.get("date") ?? "",
      address: searchParams.get("address") ?? "",
      token: token ?? "",
    };
  }, [searchParams, token]);

  const steps: Step[] = useMemo(
    () => [
      { id: "review", title: "Review Agreement", icon: FileMagnifyingGlass, active: true },
      { id: "terms", title: "Agree to Terms & Conditions", icon: SealCheck },
      { id: "confirm", title: "Confirmation", icon: Signature },
    ],
    []
  );

  useEffect(() => {
    sessionStorage.setItem(
      "moneylotAgreementDetails",
      JSON.stringify(agreementDetails)
    );
  }, [agreementDetails]);

  const handleViewAgreement = () => {
    const params = new URLSearchParams();
    Object.entries(agreementDetails).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const qs = params.toString();
    navigate(`/client-service-agreement${qs ? `?${qs}` : ""}`);
  };

  return (
    <main className="min-h-screen w-full flex bg-white">
      {/* Left sidebar (20%) */}
      <aside className="hidden md:block w-[20%] relative min-h-screen">
        <img
          src={sidebar}
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
          draggable={false}
        />
      </aside>

      {/* Right area (70%) */}
      <section className="flex-1 relative min-h-screen">
        <img
          src={backgroundImageWeb}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        <div className="relative min-h-screen px-6 pt-20 pb-16 md:px-12 md:pt-24">
          <div className="w-full max-w-[720px]">
            <h1 className="text-[#1B332D] font-semibold text-[42px] leading-[48px] md:text-[48px] md:leading-[56px] whitespace-nowrap">
              Client Service Agreement
            </h1>

            <div className="relative mt-8 space-y-8">
              <div className="absolute left-8 top-8 bottom-0 border-l border-dashed border-[#89E081]" />
              {steps.map((step, idx) => {
                const isActive = Boolean(step.active);
                return (
                  <div key={step.id} className="relative z-10 flex items-center gap-4">
                    <div
                      className={[
                        "h-16 w-16 rounded-md flex items-center justify-center shrink-0",
                        isActive && idx !== 0 ? "bg-[#EAF8E8]" : "bg-transparent",
                      ].join(" ")}
                    >
                      <img
                        src={step.icon}
                        alt=""
                        className="h-12 w-12 object-contain"
                        draggable={false}
                      />
                    </div>
                    <div className="text-[#1B332D] text-[20px] md:text-[21px] font-medium">
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-[#6F6F6F] text-[12px] md:text-[13px]">
              Please review the agreement to continue
            </p>

            <button
              type="button"
              onClick={handleViewAgreement}
              className="mt-4 inline-flex items-center justify-center h-[52px] px-10 rounded-md bg-[#89E081] text-[#1B332D] text-[18px] md:text-[20px] font-medium hover:opacity-90 transition-opacity"
            >
              View Agreement
            </button>
          </div>

          <p className="absolute bottom-6 left-0 right-0 text-center text-[#8A8A8A] text-[12px]">
            © 2026 Moneylot
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignaturePage;

