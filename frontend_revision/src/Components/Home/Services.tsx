import { BookOpen, Lightbulb, Timer } from "lucide-react";
import type { services } from "../../Types/Types";
import { ServicesDetails } from "../../Data/Data";


const Services = () => {
  const iconServices = [<Lightbulb />, <BookOpen />, <Timer />];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h2 className="text-[2vw] font-extrabold mb-[1vw] ">Nos services clés</h2>
        <p>MyRevision vous offre des outils et des ressources pour exceller dans vos études.</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[1vw] p-[2vw]">
          {ServicesDetails.map((service: services, index: number) =>
            <div key={service.id} className="bg-white p-[2vw] rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 duration-300">
              <span className="text-[var(--primary-color)] text-4xl mb-4">
                {iconServices[index]}
              </span>
              <p className="my-[1vw] font-bold">{service.titre} </p>
              <p className="text-sm text-gray-500 ">{service.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services

