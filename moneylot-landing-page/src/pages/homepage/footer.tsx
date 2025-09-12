import { imagesAndIcons } from "../../constants/imagesAndIcons";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsLaptop(window.innerWidth >= 980 && window.innerWidth <= 1239);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <footer className="w-full bg-white border-t border-gray-200 px-4 sm:px-6 md:px-20 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Section - Logo + Description */}
        <div className="flex flex-col items-start space-y-4 mt-6 md:mt-10">
          <img
            src={imagesAndIcons.moneyLotLogo}
            alt="Moneylot Logo"
            className="h-8 sm:h-10 w-auto"
          />
          <p className="text-[10px] sm:text-[10px] text-gray-600 leading-snug">
            Moneylot is a product of BRB Financial Advisory Limited, a member of
            the BRB Capital Group. <br />
            BRB Financial Advisory Limited is a fund manager licensed by the
            Securities and Exchange Commission of Nigeria.
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600">
            Copyright © {new Date().getFullYear()} Moneylot. All Rights
            Reserved.
          </p>
        </div>

        {/* Right Section - Contact + Lagos Office */}
        <div
          className={`flex w-full sm:w-3/4 md:w-1/2 gap-6 
            ${isLaptop ? "flex-col" : "lg:flex-row lg:justify-between lg:gap-0"}`}
        >
          {/* Contact Us Section */}
          <div className="flex flex-col items-start lg:items-end space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold text-[#89E081]">
              Contact Us
            </p>
            <a
              href="mailto:hello@moneylot.io"
              className="text-gray-600 hover:underline text-[10px] sm:text-xs"
            >
              hello@moneylot.com
            </a>
          </div>

          {/* Lagos Office Section */}
          <div className="flex flex-col items-start lg:items-end space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold text-[#89E081]">
              Lagos Office
            </p>
            <p className="text-gray-600 text-[10px] sm:text-xs">
              Plot 3A Shakiru Anjorin Street Lekki Phase 1, Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* Social Icons Section */}
      <div className="flex flex-wrap justify-start sm:justify-end gap-3 mt-6 md:mt-0">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={imagesAndIcons.fbIcon}
            alt="Facebook"
            className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-75"
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={imagesAndIcons.tiktokIcon}
            alt="TikTok"
            className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-75"
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={imagesAndIcons.xIcon}
            alt="Twitter"
            className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-75"
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={imagesAndIcons.snapchatIcon}
            alt="Snapchat"
            className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-75"
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={imagesAndIcons.instaIcon}
            alt="Instagram"
            className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-75"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
