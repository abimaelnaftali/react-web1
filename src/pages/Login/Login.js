import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Login.css';
import { useCar } from '../../hooks/useCart';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const { isAdmin } = useCar()

    const encryptPassword = (password) => {
        const key = CryptoJS.enc.Utf8.parse('sua-chave-secreta-muito-longa-e-segura');
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
        const encrypted = CryptoJS.AES.encrypt(password, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    };

    const loginUser = async (event) => {
        event.preventDefault();
        const encryptedPassword = encryptPassword(password);
    
        try {
            const response = await fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/users.json');
            if (!response.ok) throw new Error('Resposta de rede não foi ok');
    
            const users = await response.json();
            const userFound = Object.values(users).find(user => user.email === email && user.password === encryptedPassword);
    
            if (userFound) {
                isAdmin(userFound.email);
                navigate('/');
            } else {
                setLoginMessage('Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setLoginMessage('Erro ao realizar login. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        if (loginMessage) {
            const timer = setTimeout(() => {
                setLoginMessage('');
            }, 3000); // 3 segundos

            return () => clearTimeout(timer);
        }
    }, [loginMessage]);

    return (
        <div>
            {loginMessage && <div id="login-message">{loginMessage}</div>}
            <form onSubmit={loginUser}>
                <div className="divInForm">
                    <div className="formDiv">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <br />
                        <label htmlFor="password">Senha:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className="formButton">
                            <button type="submit">Login</button>
                        </div>
                        <div className="Links">
                            <a href="/cadastro">Cadastre-se</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
