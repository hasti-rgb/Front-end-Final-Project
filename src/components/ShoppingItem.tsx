import React from 'react'

interface ShoppingItemProps {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}
const handleAddToCart = () => {
  console.log('one item added to cart')
}
const ShoppingItem: React.FC<ShoppingItemProps> = ({
  id,
  title,
  price,
  category,
  description,
  image,
}) => {
  return (
    <div className='container  mb-4 border shadow'>
      {/* <div className='  justify-center mb-4 border shadow '> */}
      <div className='container items-center  h-1/3'>
        <img
          src={image}
          alt='cosmetic'
          className='w-full h-full object-contain	'
        />
      </div>
      <div className='container h-2/3 p-4'>
        <p className='my-3 font-bold line-clamp-1	text-lg'>{title}</p>
        <p className='text-start line-clamp-3	text-clip overflow-hidden my-2 h-1/3 '>
          {description}
        </p>
        <div className='flex flex-row justify-between content-center mt-4'>
          <p>price {price}$</p>
          <button
            type='button'
            onClick={handleAddToCart}
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
