import React from 'react'
import Product from '../../models/product'
interface CartItemProps {
  item: Product
  addToCart: (clickedItem: Product) => void
  removeFromCart: (id: number) => void
  index: number
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  addToCart,
  removeFromCart,
  index,
}) => {
  return (
    <tr className='border border-slate-400 h-20'>
      <td className='text-center'>{index + 1}</td>
      <td className='text-center  truncate'>
        {item.title.substring(0, 20)} ...
      </td>
      <td className='text-center '>{item.description.substring(0, 40)}...</td>
      <td className='text-center'>
        <div className='flex justify-between'>
          <button onClick={() => removeFromCart(item.id)}>
            <div className='rounded-full bg-red-500 text-white w-6 h-6 flex justify-center items-center'>
              -
            </div>
          </button>
          <p> {item.quantity}</p>
          <button onClick={() => addToCart(item)}>
            <div className='rounded-full bg-blue-500 text-white w-6 h-6 flex justify-center items-center'>
              +
            </div>
          </button>
        </div>
      </td>
      <td className='text-center'>{item.price}$</td>
      <td className='text-center '>
        {(item.quantity * item.price).toFixed(2)}$
      </td>
      <td>
        {' '}
        <button onClick={() => removeFromCart(item.id)}>
          <div className='rounded-full bg-red-500 text-white w-6 h-6 flex justify-center items-center'>
            trash
          </div>
        </button>
      </td>
    </tr>
  )
}

export default CartItem
