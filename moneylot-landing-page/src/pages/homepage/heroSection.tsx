import { useEffect, useState } from "react";
import { imagesAndIcons } from "../../constants/imagesAndIcons";

const HeroSection = () => {
  const allFrames = [
    imagesAndIcons.framesOne,
    imagesAndIcons.framesTwo,
    imagesAndIcons.framesThree,
    imagesAndIcons.framesFour,
  ];

  const [currentFrame, setCurrentFrame] = useState(allFrames[0]);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrameIndex =
          (allFrames.indexOf(prevFrame) + 1) % allFrames.length;
        return allFrames[nextFrameIndex];
      });
    }, 1000);

    return () => clearInterval(frameInterval);
  }, []);

  // Scroll fade effect only for desktop
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      const scrollY = window.scrollY;
      const fadeStart = window.innerHeight * 0.01;
      const fadeEnd = document.getElementById("heroText")?.offsetTop || 400;
      const fadeRange = (fadeEnd - fadeStart) / 2;

      if (scrollY < fadeStart) setHeaderOpacity(1);
      else if (scrollY <= fadeStart + fadeRange) {
        setHeaderOpacity(1 - (scrollY - fadeStart) / fadeRange);
      } else setHeaderOpacity(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HeaderContent = (
    <>
      <img src={imagesAndIcons.logoWhite} alt="Moneylot Logo" className="h-9" />
      <div className="flex space-x-2 sm:space-x-4">
        <button
          className="bg-[#F6F6F6] text-black py-1 px-2 sm:py-2 sm:px-3 hover:border-none md:py-1 md:px-3 rounded-full text-xs sm:text-sm md:text-sm focus:outline-none focus:ring-0 active:outline-none active:ring-0"
          onClick={() =>
            document
              .getElementById("aboutUs")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          About Us
        </button>
        <button
          className="group bg-[#89E081] text-black px-2 sm:px-3 md:px-3 rounded-full flex items-center gap-1 sm:gap-2 md:gap-2 text-xs sm:text-sm md:text-sm hover:border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
          onClick={() =>
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="hidden sm:flex w-0 overflow-hidden group-hover:w-10 transition-all duration-300">
            <img
              src={imagesAndIcons.waitListEmoji}
              alt="Waitlist Emoji"
              className="w-6 h-6 md:w-8 md:h-6"
            />
          </span>
          <p style={{ marginLeft: -5 }}>Join Waitlist</p>
        </button>
      </div>
    </>
  );

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1B332D] px-4 py-4 sm:py-6 lg:px-20 min-h-[20vh] sm:min-h-[40vh] lg:min-h-[130vh]">
      {/* Falling Coins */}
      <div
        className="absolute top-0 left-0 w-full z-0"
        style={{ animation: "fallingCoins 4s linear infinite" }}
      >
        <img
          src={currentFrame}
          alt="Falling Coins"
          className="w-full h-full object-contain"
          style={{ maxHeight: "140vh" }}
        />
      </div>

      {/* Desktop Header (fixed + fade) */}
      <div
        className="hidden lg:flex fixed top-4 left-1/2 transform -translate-x-1/2 rounded-lg p-3 sm:p-4 w-[80%] justify-between items-center transition-opacity duration-500 z-50"
        style={{ opacity: headerOpacity, borderRadius: 90 }}
      >
        {HeaderContent}
      </div>

      {/* Mobile/Tablet Header */}
      <div
        className="flex lg:hidden relative left-0 w-full justify-between items-center px-4 py-2 bg-[#1B332D]"
        style={{ top: -20 }}
      >
        <img
          src={imagesAndIcons.logoWhite}
          alt="Moneylot Logo"
          className="h-5"
        />
        <div className="flex space-x-2 items-center">
          <button
            className="bg-[#F6F6F6] text-black py-1 px-2 rounded-full text-[10px] focus:outline-none focus:ring-0 active:outline-none active:ring-0"
            onClick={() =>
              document
                .getElementById("aboutUs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            About Us
          </button>
          <button
            className="group bg-[#89E081] text-black px-2 rounded-full flex items-center gap-1 text-[8px] focus:outline-none focus:ring-0 active:outline-none active:ring-0"
            onClick={() =>
              document
                .getElementById("waitlist")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="hidden sm:flex w-0 overflow-hidden group-hover:w-6 transition-all duration-300">
              <img
                src={imagesAndIcons.waitListEmoji}
                alt="Waitlist Emoji"
                className="w-4 h-4"
              />
            </span>
            Join Waitlist
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center justify-between mt-[-10px] sm:mt-[-20px] lg:mt-0">
        {/* Text Section */}
        <div className="z-10 w-full text-left lg:w-1/2" id="heroText">
          <h1 className="font-extrabold leading-snug text-white text-xl sm:text-2xl md:text-3xl lg:text-[72px]">
            Build Wealth, <br /> <span>One Lot at a Time</span>
          </h1>

          {/* Mobile/tablet layout compact */}
          <div className="flex flex-row lg:block items-start mt-2 sm:mt-3 lg:mt-0 justify-between">
            <div className="flex flex-col items-start text-left">
              <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-[90%] sm:max-w-sm lg:w-3/4 mb-2 sm:mb-3">
                From everyday wins to long-term goals, Moneylot helps you save
                and invest what matters most.
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("explore")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full hover:border-none bg-[#89E081] px-3 sm:px-5 py-1.5 text-black shadow-lg text-xs sm:text-sm transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              >
                Explore Moneylot
              </button>
            </div>

            {/* Phone right aligned */}
            <img
              src={imagesAndIcons.handPhone}
              alt="Moneylot App on a phone"
              className="block lg:hidden object-contain max-h-[160px] sm:max-h-[170px] ml-2"
            />
          </div>
        </div>
      </div>

      {/* Desktop Phone */}
      <div className="hidden lg:block absolute bottom-[-45%] right-[-20%] z-10">
        <picture>
          <source srcSet={imagesAndIcons.handPhoneWebp} type="image/webp" />
          <img
            src={imagesAndIcons.handPhone}
            alt="Moneylot App on a phone"
            className="max-h-[1150px] object-contain ml-10"
          />
        </picture>
      </div>
    </section>
  );
};

export default HeroSection;

// import { useEffect, useState } from "react";
// import { imagesAndIcons } from "../../constants/imagesAndIcons"; // Import images

// const HeroSection = () => {
//   const allFrames = [
//     imagesAndIcons.framesOne,
//     imagesAndIcons.framesTwo,
//     imagesAndIcons.framesThree,
//     imagesAndIcons.framesFour,
//   ];

//   //@ts-ignore
//   const [currentFrame, setCurrentFrame] = useState(allFrames[0]);

//   useEffect(() => {
//     const frameInterval = setInterval(() => {
//       setCurrentFrame((prevFrame) => {
//         const nextFrameIndex =
//           (allFrames.indexOf(prevFrame) + 1) % allFrames.length;
//         return allFrames[nextFrameIndex];
//       });
//     }, 1000);

//     return () => clearInterval(frameInterval);
//   }, []);

//   return (
//     <section
//       className="relative flex items-center justify-center overflow-hidden
//     bg-[#1B332D] px-4 py-12 sm:py-16 lg:px-20 min-h-[90vh] lg:min-h-[100vh]"
//       style={{
//         backgroundImage: `url(${imagesAndIcons.sectionOneBackground})`, // Set the background image
//         backgroundSize: "cover", // Ensure the image covers the full section
//         backgroundPosition: "center", // Position the image in the center
//       }}
//     >
//       {/* Header Section */}
//       <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-[90%] sm:w-4/5 md:w-3/5 lg:w-2/5 flex justify-between items-center p-2 sm:p-3 md:p-0 md:h-14 md:px-6 lg:px-4">
//         <img
//           src={imagesAndIcons.moneyLotLogo}
//           alt="Moneylot Logo"
//           className="h-5 md:h-6"
//         />
//         <div className="flex space-x-2 sm:space-x-4">
//           <button
//             className="bg-[#F6F6F6] text-black py-1 px-2 sm:py-2 sm:px-3 md:py-1 md:px-3 rounded-full border-none hover:bg-[#89E081] hover:border-none transition-colors duration-300 text-xs sm:text-sm md:text-sm focus:outline-none"
//             onClick={() => {
//               const section = document.getElementById("aboutUs");
//               if (section) section.scrollIntoView({ behavior: "smooth" });
//             }}
//           >
//             About Us
//           </button>
//           <button
//             onClick={() => {
//               const section = document.getElementById("waitlist");
//               if (section) section.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="bg-[#F6F6F6] text-black px-2 sm:px-3 md:px-3 rounded-full border-none flex items-center gap-1 sm:gap-2 md:gap-2 hover:bg-[#89E081] hover:border-none transition-all duration-300 group text-xs sm:text-sm md:text-sm focus:outline-none"
//           >
//             <span className="hidden sm:flex w-0 overflow-hidden group-hover:w-10 transition-all duration-300">
//               <img
//                 src={imagesAndIcons.waitListEmoji}
//                 alt="Waitlist Emoji"
//                 className="w-6 h-6 md:w-8 md:h-6"
//               />
//             </span>
//             Join Waitlist
//           </button>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="container relative z-10 mx-auto flex flex-col items-center justify-between lg:flex-row">
//         <div className="z-10 w-full text-center lg:w-1/2 lg:text-left">
//           <h1 className="font-extrabold leading-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-[72px] mt-0 lg:-mt-20">
//             Build Wealth, <br />
//             <span>One Lot at a Time</span>
//           </h1>
//           <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 w-full lg:w-3/4 mx-auto lg:mx-0">
//             From everyday wins to long-term goals, Moneylot helps you save and
//             invest what matters most.
//           </p>
//           <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
//             <button
//               onClick={() => {
//                 const section = document.getElementById("explore");
//                 if (section) section.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="rounded-full bg-[#89E081] px-6 sm:px-8 py-3 text-black shadow-lg transition-transform duration-300 hover:scale-105 border-none text-sm sm:text-base focus:outline-none"
//             >
//               Explore Moneylot
//             </button>
//           </div>
//         </div>

//         {/* Phone Image (mobile inline) */}
//         <div className="relative mt-8 w-full lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
//           <img
//             src={imagesAndIcons.handPhone}
//             alt="Moneylot App on a phone"
//             className="block lg:hidden object-contain max-h-[210px] sm:max-h-[270px]"
//           />
//         </div>
//       </div>

//       {/* Absolute positioned phone for desktop only */}
//       {/* Absolute positioned phone for desktop only */}
//       <div className="hidden lg:block absolute bottom-[-45%] right-[-10%] z-10">
//         <picture>
//           <source srcSet={imagesAndIcons.handPhoneWebp} type="image/webp" />
//           <img
//             src={imagesAndIcons.handPhone}
//             alt="Moneylot App on a phone"
//             className="max-h-[900px] object-contain"
//           />
//         </picture>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
