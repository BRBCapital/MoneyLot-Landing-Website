import { useEffect } from "react";
import { imagesAndIcons } from "../../constants/imagesAndIcons";

const Cancelled = () => {
  // useEffect(() => {
  //   // Redirect after 10 seconds
  //   const timer = setTimeout(() => {
  //     window.location.href = "/";
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imagesAndIcons.phoneBackground}
          alt="Payment Cancelled Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Cancelled Icon Section */}
        <div className="relative flex items-center justify-center mb-24">
          {/* Sparkles - positioned around the circle */}
          {/* Top Sparkle */}
          <svg
            className="absolute top-[-3rem] w-7 h-7 animate-pulse"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 0L11.5 6L17 4.5L14.5 10L20 11.5L14.5 13L17 18.5L11.5 17L10 23L8.5 17L3 18.5L5.5 13L0 11.5L5.5 10L3 4.5L8.5 6L10 0Z"
              fill="#FFA500"
            />
          </svg>

          {/* Right Sparkle */}
          <svg
            className="absolute right-[-1.5rem] w-7 h-7 animate-pulse"
            style={{ animationDelay: "0.15s" }}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 0L11.5 6L17 4.5L14.5 10L20 11.5L14.5 13L17 18.5L11.5 17L10 23L8.5 17L3 18.5L5.5 13L0 11.5L5.5 10L3 4.5L8.5 6L10 0Z"
              fill="#FFA500"
            />
          </svg>

          {/* Bottom Sparkle */}
          <svg
            className="absolute bottom-[-3rem] w-7 h-7 animate-pulse"
            style={{ animationDelay: "0.3s" }}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 0L11.5 6L17 4.5L14.5 10L20 11.5L14.5 13L17 18.5L11.5 17L10 23L8.5 17L3 18.5L5.5 13L0 11.5L5.5 10L3 4.5L8.5 6L10 0Z"
              fill="#FFA500"
            />
          </svg>

          {/* Left Sparkle */}
          <svg
            className="absolute left-[-1.5rem] w-7 h-7 animate-pulse"
            style={{ animationDelay: "0.45s" }}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 0L11.5 6L17 4.5L14.5 10L20 11.5L14.5 13L17 18.5L11.5 17L10 23L8.5 17L3 18.5L5.5 13L0 11.5L5.5 10L3 4.5L8.5 6L10 0Z"
              fill="#FFA500"
            />
          </svg>

          {/* Light Yellow/Cream Circle with X Mark */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
              {/* X Mark */}
              <path
                d="M30 30 L70 70 M70 30 L30 70"
                stroke="#FF8C00"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Payment Cancelled Text */}
        <div className="text-center mb-2">
          <h1 className="text-[#333333] text-2xl font-bold mb-2">
            Payment Cancelled
          </h1>
          <p className="text-[#666666] text-base font-normal w-[90%] text-center mx-auto">
            Your card transaction was cancelled. Please try again
          </p>
        </div>

        {/* Loading Section */}
        <div className="absolute bottom-24 flex flex-col items-center">
          {/* Spinner */}
          <svg
            className="animate-spin h-10 w-10 mb-4"
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
              stroke="#FF8C00"
              strokeWidth="4"
              strokeDasharray="28 100"
              strokeDashoffset="0"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* Redirecting Text */}
          <p className="text-[#333333] text-base font-bold">Redirecting....</p>
        </div>
      </div>
    </div>
  );
};

export default Cancelled;
