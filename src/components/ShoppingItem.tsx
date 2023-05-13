import React from 'react'
import Product from '../models/product'
interface ShoppingItemProps {
  item: Product
  handleAddToCart: (clickedItem: Product) => void
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  handleAddToCart,
}) => {
  return (
    <div className='p-3 flex flex-col justify-center mb-4 border shadow'>
      <div className='relative h-72 lg:h-52'>
        <img
          className='absolute inset-0 object-contain w-full h-full'
          src={item.image}
          alt={item.title}
        />
      </div>
      <div className=' p-4 h-72'>
        <h3 className='my-5 xl:text-lg font-medium text-gray-900 line-clamp-1 xl:line-clamp-2'>
          {item.title}
        </h3>{' '}
        <p className='text-start break-words my-2 mt-2 text-base text-gray-500 line-clamp-6'>
          {item.description}
        </p>
      </div>
      <div className='flex flex-row justify-between content-center mt-4 px-3'>
        <p>price {item.price}$</p>
        <button
          type='button'
          onClick={() => handleAddToCart(item)}
          className='p-2  xl:px-5 xl:py-2 bg-blue-600 text-gray-50 hover:bg-blue-400'
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ShoppingItem
