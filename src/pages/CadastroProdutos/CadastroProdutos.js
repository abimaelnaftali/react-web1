import React, { useState, useEffect } from 'react';
import './cadastro_produtos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Product {
    constructor({ id, name, description, quantity, price, photo, parcels, size }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.photo = photo;
        this.parcels = parcels;
        this.size = size;
    }
}

export const CadastroProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                            //size: products[key].size
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
    }, []);

    return (
        <div className="container py-3">
            <div className="row gx-4 gy-2">
                <div className="col-md-6 mb-3">
                    <div className="p-3 bg-secondary-subtle border border-dark-subtle rounded-3">
                        <form id="add-contact-form" className="">
                            <h2 id="form-title">Adicionar Novo Produto</h2>
                            <hr />
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle" id="name" name="name"
                                    placeholder="Nome do Produto" required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle" id="description" name="description"
                                    placeholder="Descrição do Produto" required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle" id="quantity" name="quantity"
                                    placeholder="Quantidade em estoque" required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle" id="price" name="price"
                                    placeholder="Preço do produto" required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control border-dark-subtle" id="parcels" name="parcels"
                                    placeholder="Quantidade de parcelas" required />
                            </div>
                            <div className="mb-3">
                                <input type="url" className="form-control border-dark-subtle" id="photo" name="photo"
                                    placeholder="URL da imagem" />
                            </div>
                            <button type="submit" className="PlaceOrderButton" id="form-btn-add">Adicionar Contato</button>
                            <button type="button" className="PlaceOrderButton" id="form-btn-edit" style={{ display: "none" }}>
                                Salvar Alterações</button>
                            <button type="button" className="PlaceCancelOrderButton" id="cancelar"
                                onclick="resetForm()">Cancelar</button>
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
                                                <button type="button" className="my-button my-button-remove">remover</button>
                                                <button type="button" className="my-button my-button-edit">editar</button>
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