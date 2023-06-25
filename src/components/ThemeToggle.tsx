import DarkModeLogo from "../assets/darkmode.svg"
import LightModeLogo from "../assets/lightMode.svg"

export default function ThemeToggle() {
    return (
        <div>
            <img src={DarkModeLogo} alt="toggle theme" className="h-[30px] w-[30px]" />
        </div>
    )
}