import { createContext, useState } from 'react'

  export const CarContext = createContext( {} )

    export function CartContextProvider( children ) {
      const [cart, setCart] = useState([])
    
      const addProduct = (product) => {
        setCart([...cart, product])
      }
    
      const removeProduct = (productId) => {
        const newCart = cart.filter(product => product.id !== productId)
        setCart(newCart)
      }
    
      return (
        <CarContext.Provider value={{ cart, addProduct, removeProduct }}>
          {children}
        </CarContext.Provider>
      )
    }  