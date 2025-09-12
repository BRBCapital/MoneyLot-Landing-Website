import { useEffect, useState } from "react";
import { imagesAndIcons } from "../../constants/imagesAndIcons";

const HeroSection = () => {
  const allFrames = [
    imagesAndIcons.framesOne,
    imagesAndIcons.framesTwo,
    imagesAndIcons.framesThree,
    imagesAndIcons.framesFour,
  ];
  //@ts-ignore
  const [currentFrame, setCurrentFrame] = useState(allFrames[0]);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [isLaptop, setIsLaptop] = useState(false);

  // NEW: mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const checkSize = () => {
      setIsLaptop(window.innerWidth >= 980 && window.innerWidth <= 1239);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
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
      <div className="flex space-x-2 sm:space-x-4 mr-10">
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

  // handlers for menu items: keep same behavior, then close menu
  const handleAboutUs = () => {
    document.getElementById("aboutUs")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const handleWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1B332D] px-4 py-4 sm:py-6 lg:px-20 min-h-[20vh] sm:min-h-[40vh] lg:min-h-[100vh]"
        aria-hidden={menuOpen} // not necessary but hints at overlay behavior
      >
        {/* Desktop background stays as-is for web */}
        <img
          src={imagesAndIcons.sectionOneBackground}
          alt="Moneylot Background"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
        />

        {/* Desktop Header (fixed + fade) - unchanged */}
        <div
          className="hidden lg:flex fixed top-4 left-1/2 transform -translate-x-1/2 rounded-lg p-3 sm:p-4 w-[90%] justify-between items-center transition-opacity duration-500 z-50 "
          style={{ opacity: headerOpacity, borderRadius: 90 }}
        >
          {HeaderContent}
        </div>

        {/* Mobile/Tablet Header */}
        <div
          className="flex lg:hidden relative left-0 w-full justify-between items-center px-4 py-2 bg-[#1B332D]"
          style={{ top: 0, marginBottom: 30 }}
        >
          <img
            src={imagesAndIcons.logoWhite}
            alt="Moneylot Logo"
            className="h-7"
          />

          {/* Right side: keep the existing short buttons AND add a hamburger (keeps current feel, adds overlay) */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Button */}
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="bg-[#1B332D] p-2 focus:outline-none focus:ring-0"
            >
              <img
                src={imagesAndIcons.hamburger}
                alt="Hamburger menu"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Content unchanged (text + CTA + phone rendering logic) */}
        <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center justify-between mt-[-10px] sm:mt-[-20px] lg:mt-0 ">
          <div
            className="z-10 w-full text-left lg:w-1/2 pl-4 sm:pl-0" // 👈 Added padding only on mobile
            id="heroText"
          >
            <h1
              style={{ fontSize: isLaptop ? "48px" : undefined }}
              className="font-extrabold leading-snug text-white text-3xl sm:text-4xl md:text-5xl lg:text-[62px] hero-text"
            >
              Build Wealth, <br /> <span>One Lot at a Time</span>
            </h1>

            <div className="flex flex-col lg:block items-center mt-4 sm:mt-6 lg:mt-0">
              <div className="flex flex-col items-start text-left">
                <p
                  style={{ fontSize: isLaptop ? "17px" : undefined }}
                  className="
            text-sm sm:text-lg md:text-xl lg:text-[calc(1.25rem-10%)] 
            text-gray-300 
            max-w-[85%] sm:max-w-sm lg:max-w-[85%] xl:max-w-[75%] 2xl:max-w-[95%]
            hero-subtext
            mb-6 sm:mb-8
          "
                >
                  From everyday wins to long-term goals, Moneylot helps you save
                  and invest what matters most.
                </p>

                <button
                  onClick={() =>
                    document
                      .getElementById("explore")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="
            rounded-full hover:border-none bg-[#89E081] 
            px-5 py-3 text-base
            sm:px-6 sm:py-3 sm:text-base    
            md:text-lg 
            text-black shadow-lg 
            font-medium transition-transform duration-300 
            hover:scale-105 focus:outline-none focus:ring-0 active:outline-none active:ring-0
          "
                >
                  Explore Moneylot
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop phone handling (unchanged) */}
        {!isLaptop && (
          <div className="hidden lg:block absolute bottom-[-55%] right-[-20%] z-10">
            <picture>
              <source srcSet={imagesAndIcons.handPhoneWebp} type="image/webp" />
              <img
                alt="Moneylot App on a phone"
                className="max-h-[1050px] object-contain  hero-phone mr-15"
              />
            </picture>
          </div>
        )}
        {isLaptop && (
          <div className="absolute bottom-[-45%] right-[-20%] z-10">
            <picture>
              <source srcSet={imagesAndIcons.handPhoneWebp} type="image/webp" />
              <img
                src={imagesAndIcons.handPhone}
                alt="Moneylot App on a phone"
                className="object-contain ml-10 hero-phone"
                style={{
                  maxHeight: isLaptop ? "900px" : undefined,
                  marginTop: isLaptop ? -108 : undefined,
                }}
              />
            </picture>
          </div>
        )}
      </section>
      {!isLaptop && (
        <section className="lg:hidden bg-[#1B332D] flex items-center justify-center min-h-screen px-4 overflow-x-hidden overflow-y-hidden -mt-px">
          <img
            src={imagesAndIcons.mobileCoins}
            alt="Moneylot Mobile Background"
            className="absolute bottom--0 left-0 w-full object-contain pointer-events-none"
            style={{ bottom: -400 }}
          />
          <img
            src={imagesAndIcons.handPhone}
            alt="Moneylot App on a phone"
            className="object-contain w-[500%] max-h-[1000px] transform scale-235 mt-10 mr-20"
          />
        </section>
      )}

      {/* MOBILE FULLSCREEN MENU OVERLAY (only on mobile) */}
      {/* MOBILE FULLSCREEN MENU OVERLAY (only on mobile) */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white"
          role="dialog"
          aria-modal="true"
        >
          {/* Top bar: blackLogo on left, X close on right */}
          <div className="flex items-center justify-between px-4 py-4">
            <img
              src={imagesAndIcons.blackLogo ?? imagesAndIcons.logoWhite}
              alt="Moneylot Logo (black)"
              className="h-6"
            />
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="p-2 focus:outline-none focus:ring-0 bg-transparent"
            >
              {imagesAndIcons.X ? (
                <img src={imagesAndIcons.X} alt="Close" className="w-5 h-5" />
              ) : (
                <span className="text-black text-xl font-bold">×</span>
              )}
            </button>
          </div>

          {/* Menu items */}
          <div className="mt-8 px-6 space-y-6">
            <button
              onClick={handleAboutUs}
              className="w-full text-left text-black text-lg font-semibold bg-transparent"
            >
              About Us
            </button>

            <button
              onClick={handleWaitlist}
              className="w-full text-left text-[#08911A] text-lg font-semibold bg-transparent"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </>
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
//                       />
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
