import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

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

export const Produto = () => {
    const [produtos, setProdutos] = useState([]);
    const [orderField, setOrderField] = useState('menor_preco');
    const [filterField, setFilterField] = useState('todos');
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

    const filterList = () => {
        // Adicione aqui a lógica para ordenar e filtrar os produtos
        console.log('Ordenando por:', orderField, 'e filtrando por:', filterField);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container py-3 text-center">
            <div id="product-list" className="row row-cols-2 row-cols-md-4 g-2">
                {produtos.map((product) => (
                    <div className="col" key={product.id}>
                        <div className="card">
                            <a className="card-link" href={`../Produto/index.html?key=${product.id}`} target="_blank" rel="noopener noreferrer">
                                <img src={product.photo} className="card-img-top" alt={product.name} />
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <div className="card-text">
                                    R$ {product.price},00
                                </div>
                                <div className="card-text">
                                    Em até {product.parcels}x sem juros!
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};