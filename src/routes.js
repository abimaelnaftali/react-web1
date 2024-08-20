import { createBrowserRouter } from "react-router-dom";
import { MainLayout} from "./pages/layouts/MainLayout"
import { Home } from "./pages/Home/Home"
import { Cadastro } from "./pages/Cadastro/Cadastro"

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
                path: '/conta',
                element: <Home />,
            }
        ]
    }
]);