import ShoppingItem from './ShoppingItem'
import { ProductsContext } from '../store/product-context'
import React, { useContext } from 'react'
import Product from '../models/product'
interface Props {
  shoppingItems: {
    id: number
    title: string
    price: string
    category: string
    description: string
    image: string
  }[]
}

const ItemsGrid: React.FC = () => {
  const productsCtx = useContext(ProductsContext)

  return (
    <div className='grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 grid-flow-row-dense'>
      {productsCtx.items.map((item: Product) => (
        <ShoppingItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          category={item.category}
          description={item.description}
          image={item.image}
        />
      ))}
    </div>
  )
}

export default ItemsGrid
