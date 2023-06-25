import { ReactNode } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="h-full">
            <NavBar />
            <main className="h-full">
                <Outlet />
            </main>
        </div>
    )
}