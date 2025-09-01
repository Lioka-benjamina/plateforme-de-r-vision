import { Route, Routes } from "react-router-dom"
import Accueil from "../Pages/Accueil"
import { Login } from "../Pages/Login"
import { Professeur } from "../Pages/Professeur"

export const Router = () => {
    return (

        <>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/page_professeur" element={<Professeur />} />
            </Routes>
        </>
    )
}