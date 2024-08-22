import './produto.css';

export function Produto() {
    return (
        <div class="Container">
            <div class="ImageContainer">
                <img id="product-image" src="" alt="Imagem do produto"/>
            </div>

            <div class="InfoProduct">
                <h1 class="ProductTitle">Nome do Produto</h1>

                <p  class="ProductDescription">Descrição do produto</p>

                <div class="ContainerPrice">
                    <span class="Price">Preço do produto</span>

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

                <button class="AddToCartButton" type="button">Adicionar ao carrinho</button>
            </div>
        </div>
    )
}