import { createContext, useState } from 'react'

  export const CarContext = createContext( {} )

    export function CartContextProvider( {children} ) {
      const [cart, setCart] = useState([])
      const [produtos, setProdutos] = useState()
      const [admin, setAdmin] = useState(false)
    
      const addProduct = (product) => {
        console.log(cart)
        setCart([...cart, product])
      }

      const isAdmin = (email) => {
        if(email === "user@admin.com"){
          setAdmin(true)
        }
      }

      const addProdutos = (produtos) => {
        setProdutos(produtos)
      }
    
      const removeProduct = (productId) => {
        const newCart = cart.filter(product => product.id !== productId)
        setCart(newCart)
      }
    
      return (
        <CarContext.Provider value={{ cart, addProduct, removeProduct, produtos, addProdutos, admin, isAdmin }}>
          {children}
        </CarContext.Provider>
      )
    }  