import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./pages/layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Login } from "./pages/Login/Login";
import { Conta } from "./pages/Conta/Conta";

const isLoggedIn = () => {
    return !!localStorage.getItem('loggedInUser');
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/cadastro',
                element: <Cadastro />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/conta',
                element: isLoggedIn() ? <Conta /> : <Login />,
            }
        ]
    }
]);
