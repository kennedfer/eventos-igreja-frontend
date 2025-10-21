import { useState, type InputHTMLAttributes } from "react"
import { EyeClosedIcon, EyeOpenIcon } from "./Icons";

export const Input = (props: InputHTMLAttributes<HTMLInputElement> & { ref?: any }) => {
    return <input {...props} className=
        "appearance-none block w-full px-3 py-2 border border-border-light rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background-light text-text-light"
        type={props.type || "text"} />
}

export const PasswordInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = useState(false);

    return <div className=
        " flex appearance-none block w-full px-3 py-2 border border-border-light rounded-md  placeholder-gray-400 focus:outline-none focus-within:ring-primary focus-within:border-primary sm:text-sm bg-background-light text-text-light">
        <input {...props} className="grow focus:outline-none" type={showPassword ? "text" : "password"} />
        <button onClick={() => setShowPassword(prev => !prev)} tabIndex={-1} type="button">
            {showPassword ? <EyeClosedIcon/> : <EyeOpenIcon/>}
        </button>
    </div>
}
