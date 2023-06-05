import React from 'react'
import Product from '../../models/product'

interface CartItemProps {
  item: Product
  increaseProductQty: (clickedItem: Product) => void
  decreaceProductQty: (id: number) => void
  handleRemoveFromCart: (id: number) => void
  index: number
  isMobile?: boolean // New prop to determine the view mode
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  increaseProductQty: addToCart,
  decreaceProductQty,
  handleRemoveFromCart,
  index,
  isMobile = false, // Default value is false
}) => {
  if (isMobile) {
    // Render mobile view
    return (
      <div className='border border-slate-400 p-5 mb-4'>
        <div className='flex flex-col'>
          <div className='mb-2 xs:mb-3 flex justify-between items-center'>
            <div>
              <span className='font-medium'>Title:</span>{' '}
              {item.title.substring(0, 10)} ...
            </div>
            <div className='flex justify-end'>
              <div className='flex items-center space-x-2'>
                <button onClick={() => decreaceProductQty(item.id)}>
                  <div className='rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center'>
                    -
                  </div>
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => addToCart(item)}>
                  <div className='rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center'>
                    +
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className='mb-2 xs:mb-3 flex justify-between items-center'>
            <div className='hidden xs:block'>
              <span className=' font-medium '>Description:</span>{' '}
              {item.description.substring(0, 35)} ...
            </div>
          </div>
          <div className='mb-2 xs:mb-3'>
            <span className='font-medium'>Price:</span> {item.price}$
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex justify-between items-center mb-2'>
              <div>
                <span className='font-medium'>Total Price:</span>{' '}
                {(item.quantity * item.price).toFixed(2)}$
              </div>
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              <div className='rounded p-1 bg-red-500 text-white  flex items-center justify-center'>
                delete
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z'
                    fill='white'
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    // Render desktop view
    return (
      <tr className='border border-slate-400 md:h-20'>
        <td className='px-4 py-2 text-center'>{index + 1}</td>
        <td className='px-4 py-2 text-center truncate'>
          {item.title.substring(0, 20)} ...
        </td>
        <td className='px-4 py-2 text-center truncate'>
          {item.description.substring(0, 40)}...
        </td>
        <td className='px-4 py-2 text-center'>
          <div className='flex items-center justify-center'>
            <button onClick={() => decreaceProductQty(item.id)}>
              <div className='rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center'>
                -
              </div>
            </button>
            <p className='mx-2'>{item.quantity}</p>
            <button onClick={() => addToCart(item)}>
              <div className='rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center'>
                +
              </div>
            </button>
          </div>
        </td>
        <td className='px-4 py-2 text-center'>{item.price}$</td>
        <td className='px-4 py-2 text-center'>
          {(item.quantity * item.price).toFixed(2)}$
        </td>
        <td className='px-4 py-2 text-center'>
          <button onClick={() => handleRemoveFromCart(item.id)}>
            <div className='rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
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
}

export default CartItem
