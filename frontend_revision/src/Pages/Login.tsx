import { BodyLogin } from "../Components/LoginComponents/BodyLogin"
import HeadLogin from "../Components/LoginComponents/HeadLogin"

export const Login = () => {
    return (
        <>
            <div className="w-screen h-screen">
                <div>
                    <HeadLogin/>
                </div>
                <div>
                    <BodyLogin/>
                </div>
            </div>
        </>
    )
}

