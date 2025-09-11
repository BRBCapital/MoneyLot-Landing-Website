import { imagesAndIcons } from "../../constants/imagesAndIcons";

const SectionThree = () => {
  return (
    <div id="explore" className="px-4 md:px-15 bg-white">
      {/* Background container */}
      <div className="w-full relative aspect-[16/9] rounded-lg overflow-hidden">
        <picture className="block w-full h-full">
          <source srcSet={imagesAndIcons.sectionThreeWebp} type="image/webp" />
          <img
            src={imagesAndIcons.sectionThree}
            alt="Section Three Background"
            loading="lazy"
            className="w-full  object-cover" // ❌ no rounded here
          />
        </picture>

        {/* Rotating icon */}
        <img
          src={imagesAndIcons.rotatingIcon}
          alt="Rotating Icon"
          className="absolute top-4 right-4 md:top-8 md:right-8 
                     w-12 h-12 md:w-[90px] md:h-[90px]"
          style={{
            transformOrigin: "center center",
            animation: "spin 4s linear infinite",
          }}
        />
      </div>

      {/* CSS keyframes */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SectionThree;
