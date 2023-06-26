import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export function Layout() {
    return (
        <div className="">
            <NavBar />
            <main className="h-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}