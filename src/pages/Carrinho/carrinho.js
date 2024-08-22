import { useCar } from '../../hooks/useCart';
import "./carrinho.css"

export function Carrinho() {
  const { cart } = useCar()

  const cartTotal = cart.reduce((total, produto) => total + parseFloat(produto.price), 0)

    return (
        <div class="ContainerCarrinho">
        <div >
            <h3 class="SubTitle">Complete seu pedido</h3>
                <form class="CheckoutForm">
                    <div class="BlockHeader">
                        <div class="block-text">
                            <p class="blockTitle">Endereço de Entrega</p>
                            <p class="blockSubtitle">
                                Informe o endereço onde deseja receber seu pedido
                            </p>
                        </div>
                    </div>

                    <div class="formInputs">

                        <input 
                        class="CheckoutFormInput postal-code"
                          id="postal-code"
                          type="text"
                          placeholder="CEP"
                          required
                        />
                       
                        <input 
                        class="CheckoutFormInput street"
                          id="street"
                          type="text"
                          placeholder="Rua"
                          required
                        />
                        <div class="flexHor">
                          <input 
                          class="CheckoutFormInput number"
                            id="number"
                            type="text"
                            placeholder="Número"
                            required
                          />
                          
                          <input 
                          class="CheckoutFormInput complement"
                            id="complement"
                            type="text"
                            placeholder="Complemento"
                          />
                        </div>
                        
                        <div class="flexHor">
                          <input 
                          class="CheckoutFormInput neighbourhood"
                            id="neighbourhood"
                            type="text"
                            placeholder="Bairro"
                            required
                          />
                          <input 
                          class="CheckoutFormInput city"
                            id="city"
                            type="text"
                            placeholder="Cidade"
                            required
                          />
                          <input 
                          class="CheckoutFormInput cartState"
                            id="cartState"
                            type="text"
                            placeholder="UF"
                            required
                          />
                        </div>
                      </div>

                      <div class="Installments BlockLayout">
                        <div class="BlockHeader">
                          <div class="blockText">
                            <p class="blockTitle" style={{marginTop: '3rem'}}>Pagamento</p>
                            <p class="blockSubtitle">
                              O pagamento é feito na entrega. Escolha a forma que deseja pagar
                            </p>
                          </div>
                        </div>
                        <div class="installmentsOptions">
                          <button  class="PlaceOrderButton">
                            Crédito
                          </button>
                          <button  class="PlaceOrderButton">
                            Débito
                          </button >
                          <button  class="PlaceOrderButton">
                            Dinheiro
                          </button>
                        </div>
                    </div>
                </form>

                
            </div>

                <div class="rightBlocks">
                    <h3 class="SubTitle">Roupas selecionadas</h3>
                    <div class="OrderSummary" >
                      <ul class="product-list" >
                        {cart.map((product) => (
                            <li class="SelectedProduct"  >
                            <img
                              src={product.photo}
                              alt="product name"
                              class="product-image"
                            />
                            <div class="product-name-and-controls">
                              <p class="product-name">{product.name}</p>
                              <div class="controls">
                                <button class="RemoveButton" >
                                  <span class="btn-text">Remover</span>
                                </button>
                              </div>
                            </div>
                            <strong class="price">
                              {product.price} R$
                            </strong>
                          </li>
                        ))}    
                      </ul>
                      <div class="BillingSummary" >
                        <ul class="billing">
                          <li>
                            <p class="billing-items-title billing-title">
                              Total de itens
                            </p>
                            <span class="billing-items-value billing-value">
                              {cart.length} 
                            </span>
                          </li>
                          <li>
                            <p class="billing-total-title">Total</p>
                            <span class="billing-total-value">
                              R$ {cartTotal} 
                            </span>
                          </li>
                        </ul>
                          <button class="PlaceOrderButtonBig" >
                            Confirmar pedido
                          </button>
                    </div>
                  </div>
                </div>
            </div>
    )
}