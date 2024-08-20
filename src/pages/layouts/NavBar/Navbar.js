import { Link } from "react-router-dom";
import "./Navbar.css";

export function NavBar(){
    return(
        <nav class="navbar">
        <ul>
            <li class="navbar-logo">
                <Link target="_parent" to="/">
                    <h1 class="poetsen-one-regular">Essencial</h1>
                </Link>
            </li>
            <li class="navbar-burger">
                <button onclick="openMenu()"><img title="Entrar" src="../imgs/menu.png" alt=""/></button>
            </li>
            <li class="navbar-links">
                <Link to="/" target="_parent" >Início</Link>
            </li>
            <li class="navbar-links">
                <Link to="/produto" target="_parent" >Produtos</Link>
            </li>
            <li class="navbar-links">
                <Link to="/cadastrarProduto" target="_parent" >Cadastrar Produtos</Link>
            </li>
            <li class="navbar-links">
                <Link to="/sobre" target="_parent" >Sobre</Link>
            </li>
            <li class="navbar-links">
                <Link to="/carrinho" target="_parent" >Carrinho</Link>
            </li>
            <li class="navbar-links">
                <Link to="/conta" target="_parent" >Conta</Link>
            </li>
        </ul>
    </nav>
    )
}