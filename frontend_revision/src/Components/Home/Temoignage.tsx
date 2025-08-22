import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Temoignages } from "../../Data/Data";

const Temoignage = () => {
    const settings = {
        dots: true,          // petits points en bas
        infinite: true,      // boucle infinie
        speed: 500,          // vitesse de transition
        slidesToShow: 1,     // 1 slide à la fois
        slidesToScroll: 1,   // faire défiler 1 slide
        autoplay: true,      // défilement auto
        autoplaySpeed: 4000, // toutes les 4 secondes
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-2">
                Ce que nos étudiants disent
            </h2>
            <p className="text-center text-gray-600 mb-6">
                Découvrez les expériences d'apprentissage authentiques de nos étudiants satisfaits.
            </p>

            <Slider {...settings}>
                {Temoignages.map((t, index) => (
                    <div key={index} className="flex items-center justify-center text-center p-[5vw] rounded-lg  mx-2">
                        <img
                            src={t.image}
                            alt={t.nom}
                            className="w-16 h-16 rounded-full mr-4"
                        />
                        <h3 className="text-lg font-semibold">{t.nom}</h3>
                        <p className="text-gray-700">{t.message}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Temoignage;
