import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="w-full h-full px-[5vw] py-10 flex flex-col md:flex-row justify-between gap-10">
        <div className=" w-[50%] flex gap-5 text-[var(--primary-color)] font-extrabold uppercase text-2xl">
        <Facebook/>
        <Twitter/>
        <Instagram/>
        <Linkedin/>
      </div>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div>
            <h6 className="mb-1">Ressources</h6>
            <p className="md:text-[1vw] text-gray-500 mb-1">FAQ</p>
            <p className="md:text-[1vw] text-gray-500 mb-1">Blog</p>
            <p className="md:text-[1vw] text-gray-500">Support</p>
        </div>
        <div>
            <h6 className="mb-1">Légal</h6>
            <p className="md:text-[1vw] text-gray-500 mb-1">Conditions générales</p>
            <p className="md:text-[1vw] text-gray-500">Politique de confidentielité</p>
        </div>
        <div>
            <h6 className="mb-1">Contactez-nous</h6>
            <p className="md:text-[1vw] text-gray-500 mb-1">Liokabenjamina@gmail.com</p>
            <p className="md:text-[1vw] text-gray-500">+261 32 22 252 22</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Footer
