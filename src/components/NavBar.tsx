import WriteLogo from '../assets/writeB.svg'
import ViewAllLogo from "../assets/viewall.svg"
import ThemeToggle from "./ThemeToggle";
import HomeLogo from "../assets/home.svg"
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { stateAtom } from "../jotai";

export default function NavBar() {
    return (
        <nav className="sticky top-0 bg-white z-10 px-2 py-4 border-b flex flex-col items-center">
            <div className="custom-container flex justify-between  flex-auto items-center gap-2">
                <Profile />
                <Search />
                <ul className="flex flex-row items-center gap-2 sm:gap-8 justify-between">
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
                </ul>
            </div>
        </nav>
    )
}


function Search() {
    const [query, setQuery] = useState("")
    const [appState] = useAtom(stateAtom)
    const location = useLocation()

    useEffect(() => {
        setQuery("")
    }, [location])

    const posts = appState.posts.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())).map(p => { return { title: p.title, id: p.id } })
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
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {
                query.length > 0 && <SearchResults results={posts} />
            }
        </form>
    )
}

function SearchResults({ results }: { results: { title: string, id: string }[] }) {
    return (
        <div className="absolute shadow top-[100%] bg-white w-full">
            <div className="flex flex-col">
                {
                    results.map(r => {
                        return (
                            <Link to={`/post/${r.id}`} className="px-4 py-2 hover:bg-violet-400 hover:text-white cursor-pointer">
                                <span>{r.title}</span>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
    )
}




function NavIcon({ logo, caption }: { logo: string, caption: string }) {
    return (
        <figure className="flex flex-col items-center text-violet-500" style={{ color: "red" }}>
            <img src={logo} alt={`${caption}`} className="h-[25px] w-[25px]" />
            <figcaption className="text-sm text-gray-600">{caption}</figcaption>
        </figure>
    )
}