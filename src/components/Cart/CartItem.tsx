import React from 'react'
import Product from '../../models/product'
interface CartItemProps {
  item: Product
  addToCart: (clickedItem: Product) => void
  removeFromCart: (id: number) => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  addToCart,
  removeFromCart,
}) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>
        <div className='buttons'>
          <button onClick={() => removeFromCart(item.id)}>
            <div className='rounded-full bg-red-500 text-white w-8 h-8 flex justify-center items-center'>
              -
            </div>
          </button>
          <p> {item.quantity}</p>
          <button onClick={() => addToCart(item)}>
            <div className='rounded-full bg-blue-500 text-white w-8 h-8 flex justify-center items-center'>
              +
            </div>
          </button>
        </div>
      </td>
      <td>{item.price}$</td>
      <td>{(item.quantity * item.price).toFixed(2)}$</td>
    </tr>
  )
}

export default CartItem
