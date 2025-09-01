import { Lock, Mail, User } from "lucide-react"
import { useState } from "react";
import { Bouton } from "./Bouton";
import logo from "../../assets/images/logo/logoMyRevision.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export const BodyLogin = () => {
    const roles = ["élève", "parent(s)", "prof"]
    const [role, setRole] = useState("");

    return (
        <div className="w-screen flex justify-center my-[2vw]">
            <div className="w-[30vw] shadow-2xl rounded-lg">
                <div className="flex justify-center">
                    <img src={logo} alt="" className="w-[5vw] " />
                </div>
                <div className="flex flex-col items-center mb-[3vw]">
                    <h2 className="mb-[1vw] font-bold text-2xl">Bienvenue sur MyRevision</h2>
                    <p className="font-normal text-xs text-gray-500">Connectez-vous pour accéder à votre plateforme.</p>
                </div>
                <form action="" className="w-full max-w-sm mx-auto">
                    {/* Champ Email */}
                    <div className="flex flex-col mb-5">
                        <label htmlFor="email" className="text-gray-700 font-normal text-sm mb-1">
                            Votre Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="email" id="email" placeholder="votre.email@exemple.com" autoComplete="off" className="w-full rounded-md pl-10 pr-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[va(--primary-color)] focus:border-[var(--primary-color)] placeholder-gray-400 placeholder:text-sm text-gray-600 text-sm"
                            />
                        </div>
                    </div>

                    {/* Champ Password */}
                    <div className="flex flex-col mb-1">
                        <label htmlFor="password" className="text-gray-700 font-normal text-sm mb-1">
                            Votre mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="password" id="password" placeholder="votre mot de passe" autoComplete="off" className="w-full rounded-md pl-10 pr-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[va(--primary-color)] focus:border-[var(--primary-color)] placeholder-gray-400 placeholder:text-sm text-gray-600 text-sm"
                            />
                        </div>
                    </div>

                    {/* mot de pass oublié */}
                    <div className="w-full flex justify-end">
                        <p className="text-xs text-[var(--primary-color)]  cursor-pointer">Mot de pass oublié ?</p>
                    </div>

                    {/* Champ role */}
                    <div className="">
                        <label htmlFor="" className="text-gray-700 font-normal mb-1 text-sm">Vous êtes ?</label>
                        <div className="relative">
                            <User className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                name="role"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className={`
                                    w-full rounded-md pl-10 pr-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[va(--primary-color)] focus:border-[var(--primary-color)] cursor-pointer text-sm
                                    ${role === "" ? "text-gray-400" : "text-gray-600"} 
                                `}
                            >
                                {/* Option placeholder */}
                                <option value="" disabled hidden>
                                    Sélectionnez qui vous êtes
                                </option>

                                {/* Les rôles en map */}
                                {roles.map((r, index) => (
                                    <option value={r} key={index}>
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    {/* Bouton */}
                    <div className="w-full">
                        <Bouton />
                    </div>

                    <div className="flex my-4 items-center">
                        <div className="h-px flex-1 bg-gray-300 mr-3"></div>
                        <span className="text-sm text-gray-500">ou continuez avec</span>
                        <div className="h-px flex-1 bg-gray-300 ml-3"></div>
                    </div>

                    {/* Autre option */}
                    <div className="w-full flex justify-center">
                        <button className="flex justify-center items-center gap-2 border-2 w-full py-[.5vw] border-gray-300 rounded-md mb-5 cursor-pointer">
                            <FcGoogle />
                            <span className="text-sm text-gray-500">Continuez avec Google</span>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <button className="flex justify-center items-center gap-2 border-2 w-full py-[.5vw] border-gray-300 rounded-md mb-5 cursor-pointer">
                            <FaFacebook className="text-[var(--primary-color)]"/>
                            <span className="text-sm text-gray-500">Continuez avec facebook</span>
                        </button>
                    </div>

                    <div className="mb-5">
                        <p className="text-xs text-gray-500">Pas encore de compte ?
                            <span className="">
                                <a href="" className="text-green-500"> S'inscrire</a>
                            </span>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    )
}
