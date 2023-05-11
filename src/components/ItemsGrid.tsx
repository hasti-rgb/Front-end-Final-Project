import ShoppingItem from './ShoppingItem'
import React from 'react'

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

const ItemsGrid: React.FC<Props> = ({ shoppingItems }) => {
  return (
    <div className='grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 grid-flow-row-dense'>
      {shoppingItems.map((item: any) => (
        <ShoppingItem
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
