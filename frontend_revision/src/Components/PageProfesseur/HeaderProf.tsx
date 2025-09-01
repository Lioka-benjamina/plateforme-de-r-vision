import { Link } from "react-router-dom"
import profil from "../../assets/images/banner-1.png"
import logo from "../../assets/images/logo/logoMyRevision.png"
import { HelpCircle, Search, Settings } from "lucide-react"
import { useState } from "react"

export const HeaderProf = () => {

    const [isOpenProfil, setIsOpenProfil] = useState(false);

    const toggleProfil = () => {
        setIsOpenProfil((prev) => !prev);
    };


    return (
        <>
            <div className="z-50 w-screen h-16 flex  items-center bg-white  px-[2vw] shadow-md fixed top-0 left-0 right-0">
                <div className="w-[25%] h-full flex items-center">
                    <img src={logo} alt="" className="w-[5vw] " />
                </div>
                <div className="w-[75%] h-full flex gap-10">
                    <div className="flex gap-4 items-center">
                        <Link to={""} className="relative text-sm text-gray-700 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Cours</Link>
                        <Link to={""} className="relative text-sm text-gray-700 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Quiz</Link>
                        <Link to={""} className="relative text-sm text-gray-700 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Ressources</Link>
                        <Link to={""} className="relative text-sm text-gray-700 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Analytiques</Link>
                    </div>
                    <div className="flex relative items-center">
                        <Search className="absolute size-5 ml-1 text-gray-300" />
                        <input type="text" name="" id="" className="px-8 py-1 placeholder:text-[1vw] outline-none border-2 rounded-md border-gray-300 text-sm text-gray-700" placeholder="Rechercher des cours ou des quiz" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Settings className="size-4 text-gray-700" />
                        <button className="relative text-sm text-gray-700 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 cursor-pointer">Paramètre</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <HelpCircle className="size-4 text-gray-700" />
                        <button className="relative text-sm text-gray-700 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 cursor-pointer">Aide</button>
                    </div>
                    <div className="flex items-center relative" onMouseEnter={toggleProfil} onMouseLeave={toggleProfil}>
                        <div className="w-[3vw] h-[3vw] rounded-full overflow-hidden cursor-pointer">
                            <img src={profil} alt="" className="w-full h-full object-cover cursor-pointer" />
                        </div>
                        {/* {
                            isOpenProfil && (
                                <div className="w-[10vw] bg-amber-200 z-1000 transition-all duration-300">
                                    <h2>profil</h2>
                                </div>
                            )
                        } */}
                        <div className={`w-[25vw] bg-white shadow-2xl transition-all duration-300 ${isOpenProfil ? "opacity-100 scale-100" : "opacity-0 scale-95"} absolute left-[-15vw] top-[5vw] rounded-lg p-3`}>
                            <h2>ataovy ty profil tyh</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
