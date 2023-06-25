import DarkModeLogo from "../assets/darkmode.svg"
import LightModeLogo from "../assets/lightMode.svg"

export default function ThemeToggle() {
    return (
        <div>
            <img src={DarkModeLogo} alt="toggle theme" className="h-[25px] w-[25px]" />
        </div>
    )
}