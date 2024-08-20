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
            <li class="navbar-links">
                <Link target="_parent" href="../Home/index.html">INÍCIO</Link>
            </li>
            <li class="navbar-links">
                <Link target="_parent" href="../Produtos/produtos.html">PRODUTOS</Link>
            </li>
            <li class="navbar-links">
                <Link target="_parent" href="../CadastrarProduto/Index.html">CADASTRAR PRODUTOS</Link>
            </li>
            <li class="navbar-links">
                <Link target="_parent" href="../Sobre/sobre.html">SOBRE</Link>
            </li>
            <li class="navbar-links">
                <Link target="_parent" href="../Carrinho/index.html">CARRINHO</Link>
            </li>
            <li class="navbar-links">
                <Link target="_parent" href="../Login/login.html">CONTA</Link>
            </li>
        </ul>
    </nav>
    )
}