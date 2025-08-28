import Contact from "../Components/Home/Contact";
import ExtraitCours from "../Components/Home/ExtraitCours";
import Footer from "../Components/Home/Footer";
import Header from "../Components/Home/Header";
import HeroSection from "../Components/Home/HeroSection";
import Services from "../Components/Home/Services";
import Temoignage from "../Components/Home/Temoignage";

const Accueil = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full min-h-[60vh] flex items-center px-[5vw]  sm:py-16">
        <HeroSection />
      </section>

      {/* Services */}
      <section className="w-full h-full flex items-center justify-center px-[5vw] pb-16">
        <Services />
      </section>

      {/* ExtraitCours */}
      <section className="w-full px-[7vw] ">
        <ExtraitCours/>
      </section>

      {/* Temoignage */}
      <section className="w-full h-full flex items-center justify-center px-[5vw] pb-16">
        <Temoignage/>
      </section>

      {/* Contact */}
      <section className="w-full h-full flex items-center justify-center px-[5vw] py-[2vw] pb-16  bg-gray-50">
        <Contact/>
      </section>

      {/* footer */}
      <section className="w-full h-full px-[2vw] ">
        <Footer/>
      </section>
      
    </div>
  );
}

export default Accueil

