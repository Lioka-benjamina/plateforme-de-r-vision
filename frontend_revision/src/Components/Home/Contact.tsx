import { Mail, MapPin, Phone } from "lucide-react"

const Contact = () => {
    return (
        <div className="w-full h-full flex flex-col items-center gap-8 px-[2vw] ">
            <h2 className="text-[5vw] md:text-[2vw] ">Contactez-nous</h2>
            <p className="text-center">Nous sommes là pour vous aider. N'hésitez pas à nous envoyer un message ou à nous contacter via les informations ci-dessous.</p>
            <div className="w-full h-full flex flex-col md:flex-row items-start md:items-start justify-between gap-8">
                <div className="md:w-[50%] flex flex-col gap-6">
                    <div className="flex flex-col gap-3 bg-white p-5 rounded-xl">
                        <h2>Informations de contact</h2>
                        <p className="flex items-center gap-5"><MapPin className="md:w-[2vw] text-[var(--primary-color)] " /><span className="md:texte-[1vw] text-gray-600">Lot IVX 123 Bis, Analamahitsy, Antananarivo, Madagascar</span></p>
                        <p className="flex items-center gap-5"><Mail className="md:w-[2vw]  text-[var(--primary-color)] " /><span className="md:text-[1vw] text-gray-600">safidyrktnr@gmail.com</span></p>
                        <p className="flex items-center gap-5"><Phone className="md:w-[2vw] text-[var(--primary-color)] " /><span className="md:text-[1vw] text-gray-600">+261 55 666 22</span></p>
                    </div>
                    <div className="flex flex-col gap-3 bg-blue-100 p-5 rounded-xl">
                        <h2>À propos de MyRévison</h2>
                        <p className="md:text-[1vw] text-gray-600 ">MyRévision est une plateforme d'apprentissage en ligne dédiée aux étudiants, offrant des cours de qualité, des quiz interactifs et un suivi personnalisé pour leur réussite académique.</p>
                    </div>
                </div>
                <div className="w-full md:w-[40%] h-full rounded-xl  ">
                    <form action="" className="bg-white h-full p-[2vw] flex-col gap-4 rounded-xl flex">
                        <h2>Envoyer-nous un message</h2>
                        <input type="text" placeholder="Votre nom" className="p-2 border border-gray-300 rounded-lg " />
                        <input type="mail" placeholder="Votre email" className="p-2 border border-gray-300 rounded-lg" />
                        <textarea name="" id="" placeholder="Votre message" rows={5} className="p-2 border border-gray-300 rounded-lg" />
                        <button className="bg-[var(--primary-color)] text-white text-sm sm:text-base px-5 py-3 rounded-lg hover:bg-blue-700 duration-300 transition cursor-pointer">
                        Envoyez
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
