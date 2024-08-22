import { createBrowserRouter } from "react-router-dom";
import { MainLayout} from "./pages/layouts/MainLayout"
import { Home } from "./pages/Home/Home"
import { Cadastro } from "./pages/Cadastro/Cadastro"
import { Login } from "./pages/Login/Login";
import { ListaProdutos } from "./pages/ListaProdutos/ListaProdutos";
import { CadastroProdutos } from "./pages/CadastroProdutos/CadastroProdutos";

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
                element: <Login />,
            },
            {
                path: '/produtos',
                element: <ListaProdutos />,
            },
            {
                path: '/cadastroProdutos',
                element: <CadastroProdutos />
            }
        ]
    }
]);