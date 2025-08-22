import { Route, Routes } from "react-router-dom"
import Accueil from "../Pages/Accueil"
import { Login } from "../Pages/Login"

export const Router = () => {
    return (

        <>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}