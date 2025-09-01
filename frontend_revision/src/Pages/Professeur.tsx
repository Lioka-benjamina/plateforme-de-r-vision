import { AccueilProf } from "../Components/PageProfesseur/AccueilProf"
import { HeaderProf } from "../Components/PageProfesseur/HeaderProf"

export const Professeur = () => {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        {/* Header professeur */}
        <div className="w-screen">
            <HeaderProf/>
        </div>

        {/* Accueil prof */}
        <div className="w-screen">
            <AccueilProf/>
        </div>
      </div>
    </>
  )
}
