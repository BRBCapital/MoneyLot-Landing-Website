
import { imagesAndIcons } from "../../constants/imagesAndIcons";

const Failed = () => {
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
          alt="Payment Failed Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Error Icon Section */}
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
              fill="#FF6B6B"
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
              fill="#FF6B6B"
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
              fill="#FF6B6B"
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
              fill="#FF6B6B"
            />
          </svg>

          {/* Light Coral/Cream Circle with Exclamation Mark */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
              {/* Exclamation Mark */}
              <path
                d="M50 20 L50 60 M50 75 L50 80"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Payment Failed Text */}
        <div className="text-center mb-2">
          <h1 className="text-[#333333] text-2xl font-bold mb-2">
            Payment Failed
          </h1>
          <p className="text-[#666666] text-base font-normal w-[90%] text-center mx-auto">
            Your card transaction was unsuccessful. Please try again
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
              stroke="#FF6B6B"
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

export default Failed;
