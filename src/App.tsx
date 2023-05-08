import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './style.css'
import PageContent from './components/PageContent'
import ItemsGrid from './components/ItemsGrid'
import User from './components/User'
interface ItemData {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

interface ShoppingItem {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}
interface UserInfo {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}
function App() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserInfo | null>(null)

  const fetchItemsHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data: any = await response.json()
      const transformedMovies: any = data.map((itemData: ItemData) => {
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
  let userInfo: any = <p>Found no user.</p>
  if (user !== null) {
    userInfo = user.name
  }
  if (items.length > 0) {
    content = <ItemsGrid shoppingItems={items} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }
  return (
    <React.Fragment>
      <PageContent name={userInfo} />
      <section className='container py-3 px-5 grid'>{content}</section>
    </React.Fragment>
  )
}

export default App
