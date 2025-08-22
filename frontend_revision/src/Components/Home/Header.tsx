
const Header = () => {
  return (
    <div className="w-screen h-16 flex justify-between items-center bg-white  px-[5vw] shadow-md fixed top-0 left-0 right-0">
        <div className="text-[var(--primary-color)] font-extrabold uppercase">
            Logo
        </div>
        <button className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-lg">Connexion</button>
    </div>
  )
}

export default Header
