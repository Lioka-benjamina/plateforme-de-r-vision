
export default function Header() {
  return (
    <div className="w-screen h-16 flex justify-between items-center bg-white  px-[5vw]">
        <div className="text-[var(--primary-color)] font-extrabold uppercase">
            Logo
        </div>
        <button className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-lg">Connexion</button>
    </div>
  )
}
