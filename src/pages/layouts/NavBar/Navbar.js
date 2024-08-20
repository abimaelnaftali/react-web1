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
            <li class="navbar-links">
                <Link target="_parent" href="../Home/index.html">INÍCIO</Link>
            </li>
            <li class="navbar-links">
<<<<<<< HEAD
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
=======
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
>>>>>>> bc9b77a1c166d1c5e186377015e85b2950de50b6
            </li>
        </ul>
    </nav>
    )
}