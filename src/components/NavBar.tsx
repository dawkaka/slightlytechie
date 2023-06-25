import WriteLogo from '../assets/writeB.svg'
import ViewAllLogo from "../assets/viewall.svg"
import ThemeToggle from "./ThemeToggle";
import HomeLogo from "../assets/home.svg"
import Profile from "./Profile";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="sticky top-0 bg-white px-2 py-4 border-b flex flex-col items-center">
            <div className="custom-container flex justify-between  flex-auto items-center gap-4">
                <Profile />
                <Search />
                <ul className="flex flex-row items-center gap-4 w-80 justify-between">
                    <li>
                        <Link to="/">
                            <NavIcon logo={HomeLogo} caption="Home" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/write-post">
                            <NavIcon logo={WriteLogo} caption="Write" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/all-posts">
                            <NavIcon logo={ViewAllLogo} caption="Posts" />
                        </Link>
                    </li>
                    <li className="flex flex-col items-center">
                        <ThemeToggle />
                        <span className="text-sm">Theme</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}


function Search() {
    const [query, setQuery] = useState("")
    return (
        <form className="relative w-1/2">
            <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-violet11 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full outline-none p-3 pl-10 text-violet11 shadow-violet7 focus:shadow-violet8 rounded-lg shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    placeholder="Search Mockups, Logos..."
                    value={query}
                    onBlur={() => setQuery("")}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {
                query.length > 0 && <SearchResults results={["What is your name", "Hello world", "Ghana to the world"]} />
            }
        </form>
    )
}

function SearchResults({ results }: { results: string[] }) {
    return (
        <div className="absolute shadow top-[100%] p-6 bg-white w-full">
            {
                results.map(r => <h1 key={r}>{r}</h1>)
            }
        </div>
    )
}




function NavIcon({ logo, caption }: { logo: string, caption: string }) {
    return (
        <figure className="flex flex-col items-center">
            <img src={logo} alt={`${caption}`} className="h-[25px] w-[25px]" />
            <figcaption className="text-sm">{caption}</figcaption>
        </figure>
    )
}