import { useContext } from 'react'
import { CartContext } from '../context/carContext'

export function useCar() {
  const context = useContext(CartContext)

  return context
}