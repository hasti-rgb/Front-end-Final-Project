import ShoppingItem from './ShoppingItem'
import React from 'react'
import Product from '../models/product'
interface Props {
  shoppingItems: Product[]
  addToCart: (clickedItem: Product) => void
}

const ItemsGrid: React.FC<Props> = ({ shoppingItems, addToCart }) => {
  return (
    <div className='grid sm:gap-5 lg:gap-7 xl:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 grid-flow-row-dense'>
      {shoppingItems.map((item: any) => (
        <ShoppingItem item={item} handleAddToCart={addToCart} />
      ))}
    </div>
  )
}

export default ItemsGrid
