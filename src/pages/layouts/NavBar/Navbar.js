import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCar } from '../../../hooks/useCart';

export function NavBar() {
    const { admin } = useCar()

    return (
        <nav className="navbar">
            <ul>
                <li className="navbar-logo">
                    <Link to="/">
                        <h1 className="poetsen-one-regular">Essencial</h1>
                    </Link>
                </li>
                <li className="navbar-links">
                    <Link to="/">Início</Link>
                </li>
                <li className="navbar-links">
                    <Link to="/produtos">Produtos</Link>
                </li>
                {/* O link "Cadastrar Produtos" só aparece se o usuário estiver logado e for o admin */}
                {admin && (
                    <li className="navbar-links">
                        <Link to="/cadastroProdutos">Cadastrar Produtos</Link>
                    </li>
                )}
                <li className="navbar-links">
                    <Link to="/sobre">Sobre</Link>
                </li>
                <li className="navbar-links">
                    <Link to="/carrinho">Carrinho</Link>
                </li>
                <li className="navbar-links">
                    <Link to="/conta">Conta</Link>
                </li>
            </ul>
        </nav>
    );
}
