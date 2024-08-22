import { createContext, useState } from 'react'

  export const CarContext = createContext( {} )

    export function CartContextProvider( {children} ) {
      const [cart, setCart] = useState([])
      const [produtos, setProdutos] = useState()
    
      const addProduct = (product) => {
        console.log(cart)
        setCart([...cart, product])
      }

      const addProdutos = (produtos) => {
        setProdutos(produtos)
      }
    
      const removeProduct = (productId) => {
        const newCart = cart.filter(product => product.id !== productId)
        setCart(newCart)
      }
    
      return (
        <CarContext.Provider value={{ cart, addProduct, removeProduct, produtos, addProdutos }}>
          {children}
        </CarContext.Provider>
      )
    }  