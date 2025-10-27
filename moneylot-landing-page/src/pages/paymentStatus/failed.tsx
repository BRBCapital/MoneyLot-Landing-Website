import { imagesAndIcons } from "../../constants/imagesAndIcons";

const Failed = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={imagesAndIcons.phoneBackground}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
        {/* Failed Icon */}
        <img
          src={imagesAndIcons.failed}
          alt="Payment Failed"
          className="w-28 h-28 sm:w-40 sm:h-40 object-contain mb-8 animate-pulse"
        />

        {/* Text */}
        <h1 className="text-[#333333] text-2xl sm:text-3xl font-bold mb-2">
          Payment Failed
        </h1>
        <p className="text-[#666666] text-sm sm:text-base font-normal max-w-xs sm:max-w-sm mx-auto">
          Your card transaction was unsuccessful. Please try again
        </p>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-12 sm:pb-16">
        <svg
          className="animate-spin h-8 w-8 sm:h-10 sm:w-10 mb-3"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#DDDDDD"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#FF6B6B"
            strokeWidth="4"
            strokeDasharray="28 100"
            strokeDashoffset="0"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-[#333333] text-sm sm:text-base font-semibold">
          Redirecting...
        </p>
      </div>
    </div>
  );
};

export default Failed;
