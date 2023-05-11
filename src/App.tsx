import React, { useState, useEffect, useCallback, useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './style.css'
import PageContent from './components/PageContent'
import ItemsGrid from './components/ItemsGrid'
import User from './models/user'
import Product from './models/product'
import ProductsContextProvider from './store/product-context'
import { ProductsContext } from './store/product-context'
function App() {
  const [items, setItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const productsCtx = useContext(ProductsContext)

  const fetchItemsHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data: any = await response.json()
      const transformedMovies: any = data.map((itemData: Product) => {
        return {
          id: itemData.id,
          title: itemData.title,
          price: itemData.price,
          category: itemData.category,
          description: itemData.description,
          image: itemData.image,
        }
      })
      setItems(transformedMovies)
      //productsCtx.items = items
    } catch (error: any) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])
  const fetchUserHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://fakestoreapi.com/users/5')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data: any = await response.json()
      const transformedUser: any = data
      setUser(transformedUser)
    } catch (error: any) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])
  useEffect(() => {
    fetchItemsHandler()
    fetchUserHandler()
  }, [fetchItemsHandler, fetchUserHandler])

  let content: any = <p>Found no movies.</p>
  let pageContent: any = <p>Found no user.</p>
  if (user !== null) {
    pageContent = (
      <PageContent
        id={user.id}
        email={user.email}
        username={user.username}
        password={user.password}
        name={user.name}
        address={user.address}
        phone={user.phone}
      />
    )
  }
  if (items.length > 0) {
    content = <ItemsGrid />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }
  return (
    <ProductsContextProvider items={items}>
      {/* <PageContent name={user} /> */}
      <section>{pageContent}</section>
      {/* <section className='container py-3 px-5 grid'>{content}</section> */}
      <ItemsGrid />
    </ProductsContextProvider>
  )
}

export default App
