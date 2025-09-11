import React from "react";

type LegalPageProps = {
  headerImage: string;
  title?: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

const LegalPage: React.FC<LegalPageProps> = ({
  headerImage,
  title,
  lastUpdated,
  children,
}) => {
  return (
    <section className="bg-white min-h-screen w-full flex flex-col">
      {/* Header Image */}
      <div className="w-full">
        <img
          src={headerImage}
          alt={title}
          className="w-full h-40 sm:h-60 md:h-76 object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center leading-snug">
          {title}
        </h1>

        {/* Last updated */}
        {lastUpdated && (
          <p className="text-gray-500 text-sm sm:text-base text-center mb-6">
            {lastUpdated}
          </p>
        )}

        {/* Scrollable content */}
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
};

export default LegalPage;
