import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./pages/layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Login } from "./pages/Login/Login";
import { Conta } from "./pages/Conta/Conta";

const isLoggedIn = () => {
    return !!localStorage.getItem('loggedInUser');
};
import { ListaProdutos } from "./pages/ListaProdutos/ListaProdutos";
import { CadastroProdutos } from "./pages/CadastroProdutos/CadastroProdutos";
import { Sobre } from "./pages/Sobre/sobre";
import { Carrinho } from "./pages/Carrinho/carrinho";
import { Produto } from "./pages/Produto/produto";

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
            },
            {
                path: '/produtos',
                element: <ListaProdutos />,
            },
            {
                path: '/sobre',
                element: <Sobre />,
            },
            {
                path: '/carrinho',
                element: <Carrinho />,
            },
            {
                path: '/cadastroProdutos',
                element: <CadastroProdutos />
            },
            {
                path: '/produtos/:id',
                element: <Produto />
            }
        ]
    }
]);
