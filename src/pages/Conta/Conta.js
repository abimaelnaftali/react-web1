import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Conta.css';

export const Conta = () => {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [editMessage, setEditMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
        if (loggedInUser) {
            fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/users.json')
                .then(response => response.json())
                .then(data => {
                    const user = Object.values(data).find(user => user.email === loggedInUser.email);
                    setUserData(user);
                    setEditData(user);  // Inicializa os dados de edição com os dados atuais
                })
                .catch(error => console.error('Erro ao buscar dados do usuário:', error));
        } else {
            navigate('/login');
        }
    }, [navigate]);

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

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSaveEdit = async () => {
        if (!password) {
            setEditMessage('Por favor, confirme sua senha.');
            return;
        }

        const encryptedPassword = encryptPassword(password);

        if (userData.password !== encryptedPassword) {
            setEditMessage('Senha incorreta.');
            return;
        }

        if (newPassword && newPassword !== confirmNewPassword) {
            setEditMessage('As novas senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/users.json');
            const data = await response.json();
            const userKey = Object.keys(data).find(key => data[key].email === userData.email);

            if (userKey) {
                const updatedUser = {
                    ...editData,
                    ...(newPassword && { password: encryptPassword(newPassword) })
                };

                await fetch(`https://projeto-ii-c500a-default-rtdb.firebaseio.com/users/${userKey}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedUser)
                });

                setUserData(updatedUser);
                setEditData(updatedUser);
                setEditing(false);
                setEditMessage('Dados atualizados com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            setEditMessage('Erro ao atualizar os dados. Tente novamente mais tarde.');
        }
    };

    const handleDeleteAccount = async () => {
        if (!password) {
            setEditMessage('Por favor, confirme sua senha para excluir a conta.');
            return;
        }

        const encryptedPassword = encryptPassword(password);

        if (userData.password !== encryptedPassword) {
            setEditMessage('Senha incorreta.');
            return;
        }

        try {
            const response = await fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/users.json');
            const data = await response.json();
            const userKey = Object.keys(data).find(key => data[key].email === userData.email);

            if (userKey) {
                await fetch(`https://projeto-ii-c500a-default-rtdb.firebaseio.com/users/${userKey}.json`, {
                    method: 'DELETE'
                });

                localStorage.removeItem('loggedInUser');
                navigate('/');
            }
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            setEditMessage('Erro ao excluir a conta. Tente novamente mais tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
    };

    if (!userData) {
        return <h2>Carregando dados...</h2>;
    }

    return (
        <div className="conta-container">
            <h2>Minha Conta</h2>
            {editing ? (
                <div>
                    <div className="formDiv">
                        <label>Nome:</label>
                        <input type="text" name="name" value={editData.name} onChange={handleChange} />
                        
                        <label>Sobrenome:</label>
                        <input type="text" name="surname" value={editData.surname} onChange={handleChange} />
                        
                        <label>E-mail:</label>
                        <input type="email" name="email" value={editData.email} onChange={handleChange} />
                        
                        <label>CEP:</label>
                        <input type="text" name="zip" value={editData.zip} onChange={handleChange} />
                        
                        <label>Estado:</label>
                        <input type="text" name="state" value={editData.state} onChange={handleChange} />
                        
                        <label>Cidade:</label>
                        <input type="text" name="city" value={editData.city} onChange={handleChange} />
                        
                        <label>Endereço:</label>
                        <input type="text" name="address" value={editData.address} onChange={handleChange} />
                        
                        <label>Número:</label>
                        <input type="text" name="addressNumber" value={editData.addressNumber} onChange={handleChange} />
                        
                        <label>Confirme sua Senha:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        
                        <label>Nova Senha:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        
                        <label>Confirmar Nova Senha:</label>
                        <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        
                        <div className="formButton">
                            <button onClick={() => setEditing(false)} style={{ backgroundColor: 'gray' }}>Cancelar</button>
                            <button onClick={handleSaveEdit}>Salvar Alterações</button>
                        </div>
                        <div className="formButton">
                            <button onClick={handleDeleteAccount} style={{ backgroundColor: 'red' }}>Excluir Conta</button>
                        </div>
                    </div>
                    {editMessage && <p>{editMessage}</p>}
                </div>
            ) : (
                <div>
                    <div className="user-table-container">
                        <table className="user-table">
                            <tbody>
                                <tr>
                                    <td><strong>Nome:</strong></td>
                                    <td>{userData.name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sobrenome:</strong></td>
                                    <td>{userData.surname}</td>
                                </tr>
                                <tr>
                                    <td><strong>E-mail:</strong></td>
                                    <td>{userData.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>CEP:</strong></td>
                                    <td>{userData.zip}</td>
                                </tr>
                                <tr>
                                    <td><strong>Estado:</strong></td>
                                    <td>{userData.state}</td>
                                </tr>
                                <tr>
                                    <td><strong>Cidade:</strong></td>
                                    <td>{userData.city}</td>
                                </tr>
                                <tr>
                                    <td><strong>Endereço:</strong></td>
                                    <td>{userData.address}, {userData.addressNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="button-group">
                            <button className='bConta' onClick={handleLogout} style={{ backgroundColor: 'gray' }}>Logout</button>
                            <button className='bConta' onClick={handleEdit}>Editar Perfil</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
