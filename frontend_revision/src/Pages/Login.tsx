import { BodyLogin } from "../Components/LoginComponents/BodyLogin"
import HeadLogin from "../Components/LoginComponents/HeadLogin"

export const Login = () => {
    return (
        <>
            <div className="w-screen h-screen overflow-x-hidden">
                <div className="fixed w-full top-0 left-0 z-50 ">
                    <HeadLogin/>
                </div>
                <div className="mt-[5vw]">
                    <BodyLogin/>
                </div>
            </div>
        </>
    )
}

