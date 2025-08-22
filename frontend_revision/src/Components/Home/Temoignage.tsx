import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Temoignages } from "../../Data/Data";

import Banner1 from "../../assets/images/banner-1.png";
import Banner2 from "../../assets/images/banner-2.png";
import Banner3 from "../../assets/images/banner-3.png";

const Temoignage = () => {
    const images = [Banner1, Banner2, Banner3];
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
       <div className="w-screen mx-auto px-6 flex flex-col items-center ">
  <h2 className="text-3xl md:text-2xl font-bold text-center mb-3 text-gray-900">
    Ce que nos étudiants disent
  </h2>
  <p className="text-center text-gray-600 mb-8 max-w-2xl">
    Découvrez les expériences d'apprentissage authentiques de nos étudiants satisfaits.
  </p>

  <Slider {...settings} className="w-full md:w-[50%] ">
    {Temoignages.map((t, index) => (
      <div
        key={index}
        className="
          flex flex-col items-center justify-center text-center 
          p-6 md:p-8 rounded-2xl mx-3 
          bg-white shadow-lg 
          transform transition-transform duration-300
        "
      >
        <img
          src={images[index % images.length]}
          alt={t.nom}
          className="w-28 h-28 md:w-24 md:h-24 rounded-full mb-4 object-cover border-4 border-indigo-400"
        />
        <h3 className="text-xl md:text-lg font-semibold mb-2 text-gray-800">{t.nom}</h3>
        <p className="text-gray-600 text-sm md:text-base">{t.message}</p>
      </div>
    ))}
  </Slider>
</div>


    );
};

export default Temoignage;

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";      // CSS de base de react-slick
// import "slick-carousel/slick/slick-theme.css"; // Thème par défaut de react-slick
// import { Temoignages } from "../../Data/Data"; // Import des témoignages

// import Banner1 from "../../assets/images/banner-1.png";
// import Banner2 from "../../assets/images/banner-2.png";
// import Banner3 from "../../assets/images/banner-3.png";

// const Temoignage = () => {
//   const images = [Banner1, Banner2, Banner3]; // Tableau d'images correspondant aux témoignages

//   // Paramètres du carousel
//   const settings = {
//     dots: true,            // Affiche les petits points en bas du slider
//     infinite: true,        // Permet de boucler les slides à l'infini
//     speed: 500,            // Vitesse de transition en ms
//     slidesToShow: 3,       // Nombre de slides visibles en même temps
//     slidesToScroll: 1,     // Nombre de slides à faire défiler à chaque mouvement
//     autoplay: true,        // Défilement automatique
//     autoplaySpeed: 4000,   // Intervalle du défilement automatique (4s)
//     centerMode: true,      // Centre la slide active
//     centerPadding: "0px",  // Pas d'espace autour de la slide centrale
//     responsive: [
//       {
//         breakpoint: 768,  // Pour les écrans < 768px (mobile)
//         settings: {
//           slidesToShow: 1,  // Une seule slide visible
//           centerMode: false, // Désactive le mode centré sur mobile
//         },
//       },
//     ],
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-12 px-6 flex flex-col items-center bg-gray-50">
//       {/* Container principal : centré avec padding et fond gris clair */}
      
//       <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">
//         Ce que nos étudiants disent
//       </h2>
//       {/* Titre centré, taille adaptée et couleur foncée */}

//       <p className="text-center text-gray-600 mb-8 max-w-2xl">
//         Découvrez les expériences d'apprentissage authentiques de nos étudiants satisfaits.
//       </p>
//       {/* Sous-titre centré avec largeur max pour une meilleure lisibilité */}

//       <Slider {...settings} className="w-full">
//         {Temoignages.map((t, index) => (
//           <div
//             key={index}
//             className="
//               flex flex-col items-center justify-center text-center
//               p-6 md:p-8 rounded-2xl mx-3
//               bg-white shadow-lg
//               transition-transform duration-300
//               transform scale-90 opacity-70
//               slick-center:scale-105 slick-center:opacity-100
//             "
//           >
//             {/* Slide : centrée, avec padding et arrondi */}
//             {/* scale-90 + opacity-70 pour slides latérales */}
//             {/* slick-center:scale-105 + opacity-100 => slide centrale mise en avant */}

//             <img
//               src={images[index % images.length]}
//               alt={t.nom}
//               className="w-28 h-28 md:w-24 md:h-24 rounded-full mb-4 object-cover border-4 border-indigo-400"
//             />
//             {/* Image ronde avec bordure, margin bottom et objet recadré pour garder le ratio */}

//             <h3 className="text-xl md:text-lg font-semibold mb-2 text-gray-800">{t.nom}</h3>
//             {/* Nom de l'étudiant, centré et en gras */}

//             <p className="text-gray-600 text-sm md:text-base">{t.message}</p>
//             {/* Message du témoignage avec couleur gris moyen */}
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Temoignage;
