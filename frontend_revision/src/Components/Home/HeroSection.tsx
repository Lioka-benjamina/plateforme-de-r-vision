import Banner1 from "../../assets/images/banner-1.png";
import Banner2 from "../../assets/images/banner-2.png";
import Banner3 from "../../assets/images/banner-3.png";

export default function HeroSection() {
  const images = [Banner1, Banner2, Banner3];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Colonne gauche */}
        <div className="flex flex-col w-full max-w-2xl">
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
            <button className="bg-[var(--primary-color)] text-white text-sm sm:text-base px-5 py-3 rounded-lg hover:opacity-90 transition cursor-pointer">
              Commencer votre parcours
            </button>
          </div>
        </div>

        {/* Colonne droite : grille d'images responsive */}
        <div className="mt-4 lg:mt-0">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:pr-[5vw]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full aspect-[3/4] object-cover rounded-xl shadow-md"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
