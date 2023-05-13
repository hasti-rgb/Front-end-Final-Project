import React, { useState, PropsWithChildren } from 'react'
import Product from '../models/product'
type ProductsContextObj = {
  items: Product[]

  searchProduct: (input: string) => void
  loadProductsToList: (array: Product[]) => void
}
export const ProductsContext = React.createContext<ProductsContextObj>({
  items: [],

  searchProduct: () => {},
  loadProductsToList: () => {},
})

const ProductsContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [products, setProducts] = useState<Product[]>([])

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

  const loadHandler = (array: Product[]) => {
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      setProducts((prevTodos) => {
        return prevTodos.concat(element)
      })
    }
    console.log('products lenght=> ' + products.length)
  }

  const contextValue: ProductsContextObj = {
    items: products,
    searchProduct: searchHandler,
    loadProductsToList: loadHandler,
  }

  return (
    <ProductsContext.Provider value={contextValue}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
