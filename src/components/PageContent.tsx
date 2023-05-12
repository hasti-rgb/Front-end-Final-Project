import Header from './Header'
import NavigationBar from './NavigationBar'
import User from '../models/user'
import React from 'react'
import Product from '../models/product'
interface Props {
  user: User
  onSearch: (query: string) => void
  cartItems: Product[]
  getTotalItems: (items: Product[]) => any
}
const PageContent: React.FC<Props> = ({
  user,
  onSearch,
  cartItems,
  getTotalItems,
}) => {
  return (
    <div>
      <Header
        user={user}
        cartItems={cartItems}
        getTotalItems={() => getTotalItems(cartItems)}
      />
      <NavigationBar onSearch={onSearch} />
    </div>
  )
}

export default PageContent
