import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const FooterLogin = () => {
  return (
    <div className="w-screen fixed bottom-0 left-0 shadow-2xl px-[8vw] py-[1.5vw] flex justify-between  bg-white">
        <div className="flex gap-6">
          <Link to={""} className="text-gray-500 text-[1vw]">Ressources</Link>
          <Link to={""} className="text-gray-500 text-[1vw]">Légal</Link>
          <Link to={""} className="text-gray-500 text-[1vw]">Contactez-nous</Link>
        </div>
        <div className="flex gap-2">
          <FaFacebook className=" text-[var(--primary-color)]"/>
          <FaTwitter className="text-gray-500"/>
          <FaLinkedin className="text-gray-500"/>
          <FaInstagram className="text-gray-500"/>
        </div>
    </div>
  )
}
