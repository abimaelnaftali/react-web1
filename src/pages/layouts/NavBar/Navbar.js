import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function NavBar() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const adminEmail = "user@admin.com";

        if (loggedInUser && loggedInUser.email === adminEmail) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    return (
        <nav className="navbar">
            <ul>
                <li className="navbar-logo">
                    <Link target="_parent" to="/">
                        <h1 className="poetsen-one-regular">Essencial</h1>
                    </Link>
                </li>
                <li className="navbar-links">
                    <Link to="/" target="_parent">Início</Link>
                </li>
                <li className="navbar-links">
                    <Link to="/produtos" target="_parent">Produtos</Link>
                </li>
                {/* O link "Cadastrar Produtos" só aparece se o usuário estiver logado e for o admin */}
                {isAdmin && (
                    <li className="navbar-links">
                        <Link to="/cadastroProdutos" target="_parent">Cadastrar Produtos</Link>
                    </li>
                )}
                <li className="navbar-links">
                    <Link to="/sobre" target="_parent">Sobre</Link>
                </li>
                <li className="navbar-links">
                    <Link to="/carrinho" target="_parent">Carrinho</Link>
                </li>
                <li className="navbar-links">
                    <Link to="/conta" target="_parent">Conta</Link>
                </li>
            </ul>
        </nav>
    );
}
