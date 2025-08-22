import { Lock, Mail } from "lucide-react"

export const BodyLogin = () => {
    return (
        <div className="w-screen flex justify-center mt-[2vw]">
            <div className="w-[30vw] p-[1vw] shadow-md rounded-lg">
                <div className="flex justify-center">
                    <img src="" alt="logo" />
                </div>
                <div className="flex flex-col items-center mt-[1vw] mb-[3vw]">
                    <h2 className="my-[1vw] font-bold text-2xl">Bienvenue sur MyRevision</h2>
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
                    <div className="flex flex-col mb-5">
                        <label htmlFor="password" className="text-gray-700 font-normal text-sm mb-1">
                            Votre mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="password" id="password" placeholder="votre mot de passe" autoComplete="off" className="w-full rounded-md pl-10 pr-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[va(--primary-color)] focus:border-[var(--primary-color)] placeholder-gray-400 placeholder:text-sm text-gray-600 text-sm"
                            />
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
