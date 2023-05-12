import React from 'react'
import Product from '../models/product'
interface ShoppingItemProps {
  item: Product
  handleAddToCart: (clickedItem: Product) => void
}
// const handleAddToCart = () => {
//   console.log('one item added to cart')
// }
const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  handleAddToCart,
}) => {
  return (
    <div className='container  mb-4 border shadow'>
      {/* <div className='  justify-center mb-4 border shadow '> */}
      <div className='container items-center  h-1/3'>
        <img
          src={item.image}
          alt='cosmetic'
          className='w-full h-full object-contain	'
        />
      </div>
      <div className='container h-2/3 p-4'>
        <p className='my-3 font-bold line-clamp-1	text-lg'>{item.title}</p>
        <p className='text-start line-clamp-3	text-clip overflow-hidden my-2 h-1/3 '>
          {item.description}
        </p>
        <div className='flex flex-row justify-between content-center mt-4'>
          <p>price {item.price}$</p>
          <button
            type='button'
            onClick={() => handleAddToCart(item)}
            className='btn add-btn px-3 py-2 bg-blue-600 text-gray-50'
          >
            Add to cart
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default ShoppingItem
