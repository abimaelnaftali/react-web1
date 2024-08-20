import { Link } from "react-router-dom";
import "./Navbar.css";

export function NavBar(){
    return(
        <nav class="navbar">
        <ul>
            <li class="navbar-logo">
                <Link target="_parent">
                    <h1 class="poetsen-one-regular"><a target="_parent" href="../Home/index.html">Essencial</a></h1>
                </Link>
            </li>
            <li class="navbar-burger">
                <button onclick="openMenu()"><img title="Entrar" src="../imgs/menu.png" alt=""/></button>
            </li>
            <li class="navbar-links">
                <Link to="/" target="_parent" href="../Home/index.html">Início</Link>
            </li>
            <li class="navbar-links">
                <Link to="/produto" target="_parent" href="../Produtos/produtos.html">Produtos</Link>
            </li>
            <li class="navbar-links">
                <Link to="/cadastrarProduto" target="_parent" href="../CadastrarProduto/Index.html">Cadastrar Produtos</Link>
            </li>
            <li class="navbar-links">
                <Link to="/sobre" target="_parent" href="../Sobre/sobre.html">Sobre</Link>
            </li>
            <li class="navbar-links">
                <Link to="/carrinho" target="_parent" href="../Carrinho/index.html">Carrinho</Link>
            </li>
            <li class="navbar-links">
                <Link to="/login" target="_parent" href="../Login/login.html">Conta</Link>
            </li>
        </ul>
    </nav>
    )
}