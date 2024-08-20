import React, { useState } from 'react';
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
                headers: { 'Content-type': 'application/json' },
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
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            setMessage('Erro ao adicionar usuário. Tente novamente mais tarde.');
        }
    };

    return (
        <div>
            <form onSubmit={submitUser}>
                {/* Adicionar inputs para cada campo */}
                {/* Formulário e inputs... */}
                {passwordError && <p id="password-error" style={{ color: 'red' }}>{passwordError}</p>}
                <div className="formButton">
                    <button type="button" onClick={() => window.location.href = '/login'} style={{ backgroundColor: 'red' }}>Cancelar</button>
                    <button type="submit">Cadastrar</button>
                </div>
                {message && <div id="message-container">{message}</div>}
            </form>
        </div>
    );
};
