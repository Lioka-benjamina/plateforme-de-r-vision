import Header from "../Components/Home/Header";
import HeroSection from "../Components/Home/HeroSection";
import Services from "../Components/Home/Services";

export default function Accueil() {
  return (
    <div className="w-full">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full min-h-[60vh] flex items-center px-[5vw]  sm:py-16">
        <HeroSection />
      </section>

      {/* Services */}
      <section className="w-full flex items-center justify-center px-[5vw] pb-16">
        <Services />
      </section>
    </div>
  );
}


