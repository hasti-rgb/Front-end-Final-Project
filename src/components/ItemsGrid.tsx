import ShoppingItem from './ShoppingItem'
import React from 'react'
import Product from '../models/product'
import CartItemType from '../models/CartItemType'
interface Props {
  shoppingItems: Product[]
  addToCart: (clickedItem: CartItemType) => void
}

const ItemsGrid: React.FC<Props> = ({ shoppingItems, addToCart }) => {
  return (
    <div className='grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 grid-flow-row-dense'>
      {shoppingItems.map((item: any) => (
        <ShoppingItem item={item} handleAddToCart={addToCart} />
      ))}
    </div>
  )
}

export default ItemsGrid
