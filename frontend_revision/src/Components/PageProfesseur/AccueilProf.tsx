import imageAccueilProf from "../../assets/images/banner-2.png"

export const AccueilProf = () => {
  return (
    <>
      <div className="w-screen py-[12vw] bg-[var(--primary-color-prof)] flex items-center justify-center gap-[5vw]">
        <div className="w-[45vw]">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Bienvenue, Professeur <br />Dubois !</h2>
            <p className="text-gray-700 text-base">Gérez vos cours, créez des évaluations et suivez les progrès de vos étudiants avec facilité.</p>
        </div>
        <div className="">
            <img src={imageAccueilProf} alt="" />
        </div>
      </div>
    </>
  )
}
