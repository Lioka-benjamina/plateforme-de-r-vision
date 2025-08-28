import { useNavigate } from "react-router-dom";
import Banner1 from "../../assets/images/banner-1.png";
import Banner2 from "../../assets/images/banner-2.png";
import Banner3 from "../../assets/images/banner-3.png";

const HeroSection = () => {
  const navigate = useNavigate()
  const goToLogin = () =>{
    navigate("/login")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Colonne gauche */}
        <div className="flex flex-col w-full max-w-2xl mt-10 lg:mt-0">
          <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-5xl leading-tight">
            Découvrez le pouvoir du savoir avec{" "}
            <span className="uppercase">MyRévision</span>.
          </h2>

          <p className="text-base sm:text-lg text-gray-500 mt-3">
            Votre passerelle vers une éducation de qualité à Madagascar. Apprenez
            à votre rythme, développez vos compétences et atteignez vos objectifs
            académiques et professionnels.
          </p>

          <div className="mt-6">
            <button className="bg-[var(--primary-color)] text-white text-sm sm:text-base px-5 py-3 rounded-lg hover:bg-blue-700 duration-300 transition cursor-pointer" onClick={goToLogin}>
              Commencer votre parcours
            </button>
          </div>
        </div>

        {/* Colonne droite : grille d'images responsive */}
        <div className="hidden lg:block mt-4 ml-10">
          <div className="relative grid grid-cols-3 gap-3 sm:gap-4 lg:pr-[5vw] ">
            <img src={Banner1} alt="" className="relative -top-20 left-15 z-4"/>
            <img src={Banner2} alt="" className="z-3"/>
            <img src={Banner3} alt="" className="relative top-20 -left-15 z-2"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection
