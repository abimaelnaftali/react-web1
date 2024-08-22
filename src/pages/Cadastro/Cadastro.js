import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Cadastro.css';

export const Cadastro = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        zip: '',
        state: '',
        city: '',
        address: '',
        addressNumber: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');

    const encryptPassword = (password) => {
        const key = CryptoJS.enc.Utf8.parse('sua-chave-secreta-muito-longa-e-segura');
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
        return CryptoJS.AES.encrypt(password, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    };

    const validatePasswords = () => {
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('As senhas não coincidem.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const fetchCepData = async () => {
        const cep = formData.zip.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setMessage('CEP não encontrado.');
                } else {
                    setFormData((prevData) => ({
                        ...prevData,
                        state: data.uf,
                        city: data.localidade,
                        address: data.logradouro
                    }));
                }
            } catch (error) {
                setMessage('Erro ao buscar o CEP.');
            }
        }
    };

    const submitUser = async (event) => {
        event.preventDefault();

        if (!validatePasswords()) return;

        const encryptedPassword = encryptPassword(formData.password);

        const userData = {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: encryptedPassword,
            zip: formData.zip,
            state: formData.state,
            city: formData.city,
            address: formData.address,
            addressNumber: formData.addressNumber
        };

        try {
            const response = await fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('Resposta de rede não foi ok');

            setMessage('Usuário adicionado com sucesso!');
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: '',
                zip: '',
                state: '',
                city: '',
                address: '',
                addressNumber: ''
            });

            setTimeout(() => {
                window.location.href = '/conta';
            }, 3000);
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            setMessage('Erro ao adicionar usuário. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000); // 3 segundos

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="cadastro-container">
            {message && <div id="message-container">{message}</div>}
            <form onSubmit={submitUser}>
                <div className="divInForm">
                    <div className="formDiv">
                        <h2>Cadastro</h2>

                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="surname">Sobrenome:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="confirmPassword">Confirme a Senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />

                        {passwordError && <p id="password-error" style={{ color: 'red' }}>{passwordError}</p>}

                        <label htmlFor="zip">CEP:</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            onBlur={fetchCepData}
                        />

                        <label htmlFor="state">Estado:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="city">Cidade:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="address">Endereço:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="addressNumber">Número:</label>
                        <input
                            type="text"
                            id="addressNumber"
                            name="addressNumber"
                            value={formData.addressNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="formButton">
                        <button
                            type="button"
                            onClick={() => window.location.href = '/conta'}
                            style={{ backgroundColor: 'red' }}
                        >
                            Cancelar
                        </button>
                        <button type="submit">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
