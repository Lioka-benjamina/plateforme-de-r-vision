import { BookOpen, Lightbulb, Timer } from "lucide-react"

export default function Services() {
  const services = [
    {
      id: 1,
      titre: "Cours Interactifs",
      description: "Apprenez avec des leçons engageantes, des exercices pratiques et des retours immédiats pour maîtriser chaque concept.",
      icone: <Lightbulb />
    },
    {
      id: 2,
      titre: "Leçons Complètes",
      description: "Accédez à des leçons détaillées couvrant tous les aspects de chaque matière, avec des exemples et des exercices.",
      icone: <BookOpen />
    },
    {
      id: 3,
      titre: "Exercices chronometré",
      description: "Testez vos connaissances avec des exercices chronométrés pour améliorer votre rapidité et votre précision.",
      icone: <Timer />
    }
  ]
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h2 className="text-[2vw] font-extrabold mb-[1vw] ">Nos services clés</h2>
        <p>MyRevision vous offre des outils et des ressources pour exceller dans vos études.</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[1vw]">
          {services.map((service) =>
            <div key={service.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 duration-300">
              <span className="text-[var(--primary-color)]">{service.icone}</span>
              <p className="my-[1vw] font-bold">{service.titre} </p>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
