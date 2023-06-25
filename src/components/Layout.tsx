import { ReactNode } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}