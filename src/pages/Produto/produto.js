import { useParams } from 'react-router-dom';
import { useCar } from '../../hooks/useCart';
import './produto.css';

export function Produto() {
    const { produtos, addProduct } = useCar()

    const { id } = useParams()

    const product = produtos.find(p => p.id === id)

    function handleSubmit(productId){
        addProduct(productId)
    }

    return (
        <div class="Container">
            <div class="ImageContainer">
                <img id="product-image" src={product.photo} alt="Imagem do produto"/>
            </div>

            <div class="InfoProduct">
                <h1 class="ProductTitle">{product.name}</h1>

                <p  class="ProductDescription">{product.description}</p>

                <div class="ContainerPrice">
                    <span class="Price">R$ {product.price},00</span>

                    <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#a1a1aa'}}>Em ate 12x sem juros</span>
                </div>

                <div style={{ marginTop: '2rem'}}>
                    <span class="Sizes">Tamanhos</span>

                    <div class="SizesBoxButtons">
                        <button type="button" class="ButtonSize">P</button>
                        <button type="button" class="ButtonSize">M</button>
                        <button type="button" class="ButtonSize">G</button>
                    </div>
                </div>

                <button onClick={() => handleSubmit(product)} class="AddToCartButton" type="button">Adicionar ao carrinho</button>
            </div>
        </div>
    )
}