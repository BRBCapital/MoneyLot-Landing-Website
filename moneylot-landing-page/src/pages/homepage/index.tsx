
import HeroSection from './heroSection';
import InvestmentSection from './sectionTwo';
import SectionThree from './sectionThree';
import SectionFour from './sectionFour';
import SectionFive from './sectionFive';
import Footer from './footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <InvestmentSection/>
      <SectionThree/>
      <SectionFour/>
      <SectionFive/>
      <Footer/>
      {/* Other sections of the homepage will go here */}
    </div>
  );
};

export default HomePage;