import { useNavigate } from "react-router-dom"
import logo from "../../assets/images/logo/logoMyRevision.png";

const Header = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate("/login")
  }
  return (
    <div className="z-50 w-screen h-16 flex justify-between items-center bg-white  px-[5vw] shadow-md fixed top-0 left-0 right-0">
      <div className="text-[var(--primary-color)] font-extrabold uppercase">
        <img src={logo} alt="" className="w-[5vw] "/>
      </div>
      <button className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-700 duration-300 "
        onClick={goToLogin}
      >
        Connexion
      </button>
    </div>
  )
}

export default Header
