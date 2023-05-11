import React, { useState, PropsWithChildren } from 'react'
import Product from '../models/product'
import ItemsGrid from '../components/ItemsGrid'
type ProductsContextObj = {
  items: Product[]

  searchProduct: (input: string) => void
}
export const ProductsContext = React.createContext<ProductsContextObj>({
  items: [],

  searchProduct: () => {},
})

const ProductsContextProvider: React.FC<
  PropsWithChildren<{ items: Product[] }>
> = (props) => {
  const [products, setProducts] = useState<Product[]>(props.items)

  const searchHandler = (input: string) => {
    setProducts((prevTodos) => {
      return prevTodos.filter(
        (product) =>
          product.category.toLowerCase().includes(input.toLowerCase()) ||
          product.title.toLowerCase().includes(input.toLowerCase()) ||
          product.description.toLowerCase().includes(input.toLowerCase())
      )
    })
  }
  const contextValue: ProductsContextObj = {
    items: products,
    searchProduct: searchHandler,
  }

  return (
    <ProductsContext.Provider value={contextValue}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
