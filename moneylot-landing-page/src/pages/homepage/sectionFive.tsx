import { useState, useEffect } from "react";
import axios from "axios";
import { imagesAndIcons } from "../../constants/imagesAndIcons";
import { Link } from "react-router-dom";
import CurlyTicker from "../../components/curlyTicker";
import CurlyTicker2 from "../../components/curlyTickerTwo";
import CurlyTickerMobile from "../../components/curlyTickerMobile";
import CurlyTicker2Mobile from "../../components/curlyTickerTwoMobile";

// If you don’t have a toast library already, you can use react-hot-toast
import { toast } from "react-toastify";

const SectionFive = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://mlotdev.azurewebsites.net/api/v1/emailsubscriber/email-subscribe",
        { emailAddress: email },
        {
          headers: {
            "X-Auth-Signature":
              "68A5B200321330893A449FE508968CF9F6C3AF38130AF5A40E577CA36A0D7A60D9AC7A938087CDE9A3A3862FD6AB38AB85C1D7F4A31A2BD78171E1ADE6FF46B6",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setShowModal(true);
        setEmail("");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.title ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resize event to track screen size

  return (
    <div
      id="waitlist"
      className="relative w-full bg-[#F6F6F6] flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* Header */}
      <h1 className="text-[32px] sm:text-[48px] md:text-[72px] font-normal text-center text-gray-900 mt-20 leading-tight">
        Ready to transform <br className="hidden md:block" /> your finances?
      </h1>

      <p className="mt-4 text-sm sm:text-base md:text-xl text-gray-600 text-center">
        Join our waitlist now!
      </p>

      <div
        className="mt-8 flex w-full max-w-lg bg-white border-none rounded-full shadow-sm overflow-hidden items-center"
        style={{ padding: 4, paddingRight: 10 }}
      >
        <div className="flex items-center pl-2">
          <img
            src={imagesAndIcons.emailIcon}
            alt="Email Icon"
            className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11"
          />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-gray-700 outline-none"
        />

        <button
          onClick={handleSubscribe}
          disabled={loading}
          style={{ marginRight: 0, fontSize: 13 }}
          className={`${
            loading ? "opacity-70 cursor-not-allowed" : ""
          } bg-[#89E081] hover:border-none text-black font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full mx-1 h-[35px] sm:mx-2 transition-colors text-xs sm:text-sm md:text-base 
  focus:outline-none focus:ring-0 active:outline-none active:ring-0`}
        >
          {loading ? "Loading..." : "Join Waitlist"}
        </button>
      </div>

      <p className="mt-4 text-[10px] sm:text-xs text-gray-600 text-center mb-9 leading-snug">
        By joining the waitlist, you agree to Moneylot’s{" "}
        <Link
          to="/terms-of-use"
          className="text-[#89E081] underline cursor-pointer hover:text-[#89E081]"
        >
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy-policy"
          className="text-[#89E081] underline cursor-pointer hover:text-[#89E081]"
        >
          Privacy Policy
        </Link>
      </p>

      {/* Curly ribbon with flowing text */}
      <div className="w-full z-[9999] pointer-events-none">
        {/* Desktop */}
        {isMobile ? (
          <>
            <CurlyTickerMobile />
            <CurlyTicker2Mobile />
          </>
        ) : (
          <>
            <CurlyTicker />
            <CurlyTicker2 />
          </>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-2xl shadow-lg w-[95%] max-w-2xl p-8 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* Success Image */}
            <div className="flex justify-center mb-6">
              <img
                src={imagesAndIcons.successZ}
                alt="Success"
                className="w-24 h-24"
              />
            </div>

            {/* Header Text */}
            <h2 className="text-3xl font-semibold text-center mb-4">
              You’re In!
            </h2>

            {/* Subtext */}
            <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed">
              Thanks for joining the Moneylot waitlist. We’ll contact you as
              soon as we’re ready to welcome you onboard.
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#89E081] text-black font-medium px-8 py-3 rounded-full text-lg"
              >
                Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionFive;
