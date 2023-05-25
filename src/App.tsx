import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './style.css'
import ItemsGrid from './components/ItemsGrid'
import User from './models/user'
import Product from './models/product'
import CartPage from './components/Cart/CartPage'
import Header from './components/Header'
import NavigationBar from './components/NavigationBar'
import UserDetailPage from './components/User/userDetailPage'
function App() {
  const [items, setItems] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>([])

  //-----------------------get products from server-----------------------------------
  const fetchItemsHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data: any = await response.json()
      const transformedItems: any = data.map((itemData: Product) => {
        return {
          id: itemData.id,
          title: itemData.title,
          price: itemData.price,
          category: itemData.category,
          description: itemData.description,
          image: itemData.image,
        }
      })
      //--------------------------------------------------------------------------
      setItems(transformedItems)

      const categories = new Set<string>() // create a new set to store unique categories
      transformedItems.forEach((item: Product) => {
        categories.add(item.category) // add the category to the set
      })
      const uniqueCategories = Array.from(categories)
      setCategories(uniqueCategories)
    } catch (error: any) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])
  //--------------------------get user from server------------------------------------
  const fetchUserHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://fakestoreapi.com/users/7')
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
  //----------------------------------------------------------------------------------
  useEffect(() => {
    fetchItemsHandler()
    fetchUserHandler()
  }, [fetchItemsHandler, fetchUserHandler])
  //----------------------------------------------------------------------------------

  const handleSearch = useCallback(
    (query: string) => {
      const filteredResults = items.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProducts(filteredResults)
    },
    [items]
  )
  //----------------------------------------------------------------------------------
  const handleFilter = useCallback(
    (category: string) => {
      const filteredResults = items.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
      setFilteredProducts(filteredResults)
    },
    [items]
  )
  //-------------------------------handle cart----------------------------------------
  const getTotalItems = useCallback(
    (items: Product[]) =>
      items.reduce((ack: number, item) => ack + item.quantity, 0),
    []
  )

  //----------------------------------------------------------------------------------
  const handleAddToCart = useCallback((clickedItem: Product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...clickedItem, quantity: 1 }]
    })
  }, [])
  //----------------------------------------------------------------------------------
  const handleDecrease = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack
          return [...ack, { ...item, quantity: item.quantity - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as Product[])
    )
  }, [])
  //----------------------------------------------------------------------------------
  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])
  //----------------------------------------------------------------------------------
  const memoizedContent = useMemo(() => {
    if (items.length > 0) {
      return (
        <ItemsGrid
          shoppingItems={filteredProducts.length > 0 ? filteredProducts : items}
          addToCart={handleAddToCart}
        />
      )
    } else if (error) {
      return <p>{error}</p>
    } else if (isLoading) {
      return <p>Loading...</p>
    } else {
      return <p>Found no movies.</p>
    }
  }, [items, filteredProducts, error, isLoading, handleAddToCart])

  const memoizedPageContent = useMemo(() => {
    if (user !== null) {
      return (
        <Header
          user={user}
          cartItems={cartItems}
          getTotalItems={getTotalItems}
        />
      )
    } else {
      return <p>Found no user.</p>
    }
  }, [user, cartItems, getTotalItems])

  const memoizedUserPage = useMemo(() => {
    if (user !== null) {
      return <UserDetailPage user={user} />
    } else {
      return <p>Found no user.</p>
    }
  }, [user])

  //----------------------------------------------------------------------------------
  return (
    <Router>
      <div>
        <section>{memoizedPageContent}</section>
        <Routes>
          <Route
            path='/cart'
            element={
              <CartPage
                increaseProductQty={handleAddToCart}
                cartItems={cartItems}
                decreaceProductQty={handleDecrease}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route
            path='/'
            element={
              <React.Fragment>
                <NavigationBar
                  onSearch={handleSearch}
                  categories={categories}
                  onfilter={handleFilter}
                />
                <section className='w-full py-3 px-5 '>
                  {memoizedContent}
                </section>
              </React.Fragment>
            }
          />
          <Route path='/user-info' element={memoizedUserPage} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
