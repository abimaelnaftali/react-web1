import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/Navbar"
import { Footer } from "./Footer/Footer"

export function MainLayout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
            <>
                <NavBar/>
                <Outlet />
            </>
            <Footer/>
        </div>
    );
}