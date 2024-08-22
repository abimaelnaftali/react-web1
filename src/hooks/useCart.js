import { useContext } from 'react'
import { CarContext } from '../context/CartContext'

export function useCar() {
  const context = useContext(CarContext)

  return context
}