import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logoMyRevision.png";
import { IoMdReturnRight } from "react-icons/io";
import { useEffect, useState } from "react";

const HeadLogin = () => {
    const navigate = useNavigate()
    const [migration, setMigration] = useState(false);

    const handleClickReturn = () => {
      setMigration(true)
      console.log(migration);
    }

    useEffect(() => {
        if (migration) {
            navigate("/accueil")
        }
    }, [migration]);
    
    return (
        <div className="w-screen bg-white shadow-md flex items-center justify-between px-[4vw]">
            <div className="">
                <img src={logo} alt="" className="w-[3vw] h-[5vw]" />
            </div>
            <div className="">
                <button className="cursor-pointer" onClick={handleClickReturn}>
                    <IoMdReturnRight className="text-[var(--primary-color)] size-[1.5vw] hover:text-blue-700"/>
                </button>
            </div>
        </div>
    )
}

export default HeadLogin

