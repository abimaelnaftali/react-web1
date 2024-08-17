import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/Navbar"
import { Footer } from "./Footer/Footer"

export function MainLayout() {
    return (
        <>
        <NavBar/>
            <Outlet />
        <Footer/>
        </>
    );
}