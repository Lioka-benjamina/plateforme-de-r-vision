import { Route, Routes } from "react-router-dom"
import Accueil from "../Pages/Accueil"

export const Router = () => {
    return (

        <>
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                 <Route path="/accueil" element={<Accueil/>}/>
            </Routes>
        </>
    )
}