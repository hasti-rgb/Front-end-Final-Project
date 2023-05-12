import React from 'react'
import Product from '../../models/product'
interface CartItemProps {
  item: Product
  increaseProductQty: (clickedItem: Product) => void
  decreaceProductQty: (id: number) => void
  handleRemoveFromCart: (id: number) => void
  index: number
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  increaseProductQty: addToCart,
  decreaceProductQty,
  handleRemoveFromCart,
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
          <button onClick={() => decreaceProductQty(item.id)}>
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
        <button onClick={() => handleRemoveFromCart(item.id)}>
          <div className='rounded-full bg-red-500 text-white w-6 h-6 flex justify-center items-center'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z'
                fill='white'
              />
            </svg>
          </div>
        </button>
      </td>
    </tr>
  )
}

export default CartItem
