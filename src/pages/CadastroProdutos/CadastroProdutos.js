import React, { useState, useEffect } from 'react';
import './cadastro_produtos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Product {
    constructor({ id, name, description, quantity, price, photo, parcels }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.photo = photo;
        this.parcels = parcels;
    }
}

export const CadastroProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        parcels: '',
        photo: '',
    });
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [handleUpdate, setHandleUpdate] = useState(() => () => {
        alert("Faz nada!");
    });

    useEffect(() => {
        function fetchProdutos() {
            fetch("https://projeto-ii-c500a-default-rtdb.firebaseio.com/products.json")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Resposta da rede não foi ok");
                    }
                    return response.json(); //produtos vão pro próximo then
                })
                .then((products) => {
                    const productsList = [];
                    for (let key in products) {
                        const product = new Product({
                            id: key,
                            name: products[key].name,
                            description: products[key].description,
                            quantity: products[key].quantity,
                            price: products[key].price,
                            photo: products[key].photo,
                            parcels: products[key].parcels,
                        });

                        productsList.push(product);
                    }
                    setProdutos(productsList);
                })
                .catch((error) => {
                    //se acontecer algum erro no processamento do fetch
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        fetchProdutos();
        if (message) {
            alert(message);
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000); // 3 segundos

            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        setHandleUpdate(() => () => {
            updateProduct(isEditing); // Chama o update com o id do produto
        });
    }, [formData, isEditing]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            parcels: formData.parcels,
            photo: formData.photo || 'https://via.placeholder.com/100', // Foto padrão,
        };

        try {
            const response = await fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/products.json', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (!response.ok) throw new Error('Resposta de rede não foi ok');

            setMessage("Produto adicionado com sucesso!");
            resetForm();
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function resetForm() {
        setFormData({
            name: '',
            description: '',
            quantity: '',
            price: '',
            parcels: '',
            photo: '',
        });

        setIsEditing(false);
    }

    function removeProduct(productId) {
        return fetch(`https://projeto-ii-c500a-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resposta de rede não foi ok');
                }
                setMessage("Remoção realizada com sucesso!");
            })
            .catch(error => {
                console.error('Houve um problema ao remover o produto:', error);
            });
    }

    function addProductToForm(productId) {
        return fetch(`https://projeto-ii-c500a-default-rtdb.firebaseio.com/products/${productId}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resposta de rede não foi ok');
                }
                return response.json();
            })
            .then(product => {
                setFormData((prevData) => ({
                    ...prevData,
                    name: product.name,
                    description: product.description,
                    quantity: product.quantity,
                    price: product.price,
                    parcels: product.parcels,
                    photo: product.photo,
                }));
                console.log(formData);

                setIsEditing(productId);
            })
            .catch(error => {
                console.error('Houve um problema ao recuperar informações do produto:', error);
            });
    }

    function updateProduct(productId) {
        console.log("Update product", formData);

        const productData = {
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            parcels: formData.parcels,
            photo: formData.photo || 'https://via.placeholder.com/100', // Foto padrão,
        };
        return fetch(`https://projeto-ii-c500a-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Resposta de rede não foi ok');

                setMessage("Produto editado com sucesso!");
                setIsEditing(false);
                resetForm();
            })
            .catch(error => {
                console.error('Houve um problema ao editar o produto:', error);
            });
    }

    return (
        <div className="container py-3">
            <div className="row gx-4 gy-2">
                <div className="col-md-6 mb-3">
                    <div className="p-3 bg-secondary-subtle border border-dark-subtle rounded-3">
                        <form id="add-contact-form" onSubmit={handleSubmit}>
                            <h2 id="form-title">Adicionar Novo Produto</h2>
                            <hr />
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle"
                                    id="name" name="name" value={formData.name}
                                    placeholder="Nome do Produto" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle"
                                    id="description" name="description" value={formData.description}
                                    placeholder="Descrição do Produto" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle"
                                    id="quantity" name="quantity" value={formData.quantity}
                                    placeholder="Quantidade em estoque" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle"
                                    id="price" name="price" value={formData.price}
                                    placeholder="Preço do produto" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle"
                                    id="parcels" name="parcels" value={formData.parcels}
                                    placeholder="Quantidade de parcelas" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="url" className="form-control border-dark-subtle"
                                    id="photo" name="photo" value={formData.photo}
                                    placeholder="URL da imagem" onChange={handleChange} />
                            </div>
                            {!isEditing ? (
                                <button type="submit" className="PlaceOrderButton" >
                                    Adicionar Produto
                                </button>
                            ) :
                                <button type="button" className="PlaceOrderButton"
                                    onClick={handleUpdate}>
                                    Salvar Alterações
                                </button>
                            }

                            <button type="button" className="PlaceCancelOrderButton" id="cancelar"
                                onClick={resetForm}>Cancelar</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6  mb-2">
                    <div className="p-3 bg-secondary-subtle border border-dark-subtle rounded-3">
                        <h2>Lista de Produtos</h2>
                        <hr />
                        <div id="product-list" className="g-5">
                            {produtos.map((product) => (
                                <div className="card my-card">
                                    <div className="row" key={product.id}>
                                        <div className="col-4">
                                            <img src={product.photo} className="card-img-top my-image" alt={product.name} />
                                        </div>
                                        <div className="col-8">
                                            <h5 className="card-title">{product.name}</h5>
                                            <div className="row">
                                                <button type="button" className="my-btn my-btn-remove"
                                                    onClick={() => removeProduct(product.id)}>
                                                    remover</button>
                                                <button type="button" className="my-btn my-btn-edit"
                                                    onClick={() => addProductToForm(product.id)}>
                                                    editar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}