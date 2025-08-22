import { Youtube } from "lucide-react";
import { cours } from "../../Data/Data";

const ExtraitCours = () => {
  return (
    <div className="">
      <h2 className="text-center font-extrabold text-[2vw]">Extrais de nos cours</h2>
      <div className="grid md:grid-cols-2">
        <div className="py-[4vw]">
          <div className="flex items-center justify-center w-full h-[50vh] bg-gray-200 rounded-md">
            <div><Youtube className="text-white "/></div>
          </div>
          <div className="pt-[.5vw]">
            <h4 className="font-bold md:text-[2vw] text-[3vw] ">Maîtriser les Fondamentaux de la Science</h4>
            <p className="pt-[.5vw] text-gray-600 md:text-[1vw] text-[2vw] ">Plongez dans les principes de base de la physique, de la chimie et de la biologie avec des explications claires et des démonstrations pratiques. Ce cours est conçu pour les débutants et ceux qui souhaitent revoir les concepts essentiels.</p>
          </div>
        </div>
        <div className="py-[4vw] px-[4vw] ">
          <p className="pb-[1vw] font-bold text-gray-600">Suggestions de cours populaires</p>
          <div className="grid grid-cols-1 gap-4">
            {cours.map((C, index) => (
              <div key={index} className=" flex items-center gap-4 p-[.5vw] rounded-md hover:scale-102 hover:bg-gray-100  duration-300 transition-all cursor-pointer">
                {/* <img src="" alt="" /> */}
                <div>
                  <div className="w-[5vw] h-[5vw] bg-gray-400 flex items-center justify-center rounded-md "><Youtube className="text-white "/></div>
                </div>
                <div>
                  <p className="text-[.8vw] text-gray-500 ">{C.matiere_id.nom}</p>
                  <h2>{C.titre}</h2>
                  <p className="text-[.8vw] text-gray-500 ">{C.auteur_id.nom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtraitCours;
