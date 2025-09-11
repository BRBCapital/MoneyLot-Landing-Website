import { imagesAndIcons } from "../../constants/imagesAndIcons"; // Import images

const SectionFour = () => {
  return (
    <div className="w-full bg-white p-6 md:p-10">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* Left Image */}
        {/* Left Image */}
        <div className="w-full md:w-1/2 p-2">
          <div className="rounded-lg overflow-hidden h-full">
            <picture>
              <source
                srcSet={imagesAndIcons.sectionFourLeftImageWebp}
                type="image/webp"
              />
              <img
                src={imagesAndIcons.sectionFourLeftImage}
                alt="Section Four Left"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <picture>
            <source
              srcSet={imagesAndIcons.sectionFourRightImageOneWebp}
              type="image/webp"
            />
            <img
              src={imagesAndIcons.sectionFourRightImageOne}
              alt="Section Four Right 1"
              loading="lazy"
              className="w-full object-cover rounded-lg mb-4 -mt-4 md:mt-[-20px]"
            />
          </picture>

          <picture >
            <source
              srcSet={imagesAndIcons.sectionFourRightImageTwoWebp}
              type="image/webp"
            />
            <img
              src={imagesAndIcons.sectionFourRightImageTwo}
              alt="Section Four Right 2"
              loading="lazy"
              className="w-full object-cover rounded-lg mb-4 -mt-6 md:mt-[-50px]"
            />
          </picture>

          <picture>
            <source
              srcSet={imagesAndIcons.sectionFourRightImageThreeWebp}
              type="image/webp"
            />
            <img
              src={imagesAndIcons.sectionFourRightImageThree}
              alt="Section Four Right 3"
              loading="lazy"
              className="w-full object-cover rounded-lg -mt-6 md:mt-[-50px]"
            />
          </picture>
        </div>
      </div>

      {/* Bottom Certifications */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0 w-full md:w-3/5 mx-auto mt-8">
        <img
          src={imagesAndIcons.secCertified}
          alt="SEC Certified"
          loading="lazy"
          className="h-12 md:h-20 object-contain"
        />
        <img
          src={imagesAndIcons.nprCertified}
          alt="NPR Certified"
          loading="lazy"
          className="h-12 md:h-20 object-contain"
        />
        <img
          src={imagesAndIcons.iso}
          alt="ISO Certified"
          loading="lazy"
          className="h-12 md:h-20 object-contain"
        />
        <img
          src={imagesAndIcons.amlCertified}
          alt="AML Certified"
          loading="lazy"
          className="h-12 md:h-20 object-contain"
        />
      </div>
    </div>
  );
};

export default SectionFour;
