import { imagesAndIcons } from "../../constants/imagesAndIcons"; // Import images from your constants file

const InvestmentSection = () => {
  return (
    <section className="relative bg-white px-4 py-16 lg:px-20" id="aboutUs">
      {/* Top Features */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-8 space-y-6 md:space-y-0">
        {/* Item 1 - High Yield Savings */}
        {/* Item 1 - High Yield Savings */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-3 md:space-y-0 md:space-x-4 p-6 rounded-lg w-full md:w-1/3">
          <img
            src={imagesAndIcons.high}
            alt="High Yield Savings"
            className="h-12 w-12"
          />
          <div className="text-black ml-2">
            <h3 className="font-semibold text-base leading-5">
              High-Yield Savings
            </h3>
            <p className="text-sm md:text-base font-normal mt-1">
              Save faster and earn higher returns
            </p>
          </div>
        </div>

        {/* Item 2 - Smart Investments */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-3 md:space-y-0 md:space-x-4 p-6 rounded-lg w-full md:w-1/3">
          <img
            src={imagesAndIcons.smart}
            alt="Smart Investments"
            className="h-12 w-12 mx-auto md:mx-0"
          />
          <div className="text-black text-center md:text-left ml-3">
            <h3 className="font-semibold text-base leading-5">
              Smart Investments
            </h3>
            <p className="text-sm md:text-base font-normal mt-1">
              Grow wealth steadily with curated plans
            </p>
          </div>
        </div>

        {/* Item 3 - Flexible Loans */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-3 md:space-y-0 md:space-x-4 p-6 rounded-lg w-full md:w-1/3">
          <img
            src={imagesAndIcons.flexible}
            alt="Flexible Loans"
            className="h-12 w-12 mx-auto md:mx-0"
          />
          <div className="text-black text-center md:text-left ml-3">
            <h3 className="font-semibold text-base leading-5">
              Flexible Loans
            </h3>
            <p className="text-sm md:text-base font-normal mt-1">
              Get quick funds when you need it
            </p>
          </div>
        </div>
      </div>

      {/* Smart Investing Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4 mt-8">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2">
          <picture>
            <source
              srcSet={imagesAndIcons.sectionTwoImageOneWebp}
              type="image/webp"
            />
            <img
              src={imagesAndIcons.sectionTwoImageOne}
              alt="Growth Simplified"
              className="w-full h-auto"
            />
          </picture>
        </div>

        {/* Right Section - Text */}
        <div className="w-full md:w-1/2 p-2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-900">
            Smart <br className="hidden md:block" />
            Investing
            <br />
            Starts Here
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 mx-auto md:mx-0 w-full md:w-[85%] text-center md:text-justify">
            Whether you're an individual building financial security, a business
            maximizing cash flow, or a wealth manager seeking stable returns, we
            deliver fixed investment solutions that actually work.
          </p>
        </div>
      </div>

      {/* Growth Simplified Section */}
      {/* Growth Simplified Section */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4 mt-12">
        {/* Left Section - Text */}
        <div className="w-full md:w-1/2 p-2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-900">
            Growth <br className="hidden md:block" />
            Simplified
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            We turn your idle money into reliable income. No complexity. No
            surprises. Just guaranteed growth.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 p-2 md:p-9">
          <picture>
            <source
              srcSet={imagesAndIcons.sectionTwoImageTwoWebp}
              type="image/webp"
            />
            <img
              src={imagesAndIcons.sectionTwoImageTwo}
              alt="Growth Simplified"
              className="w-full h-auto"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
