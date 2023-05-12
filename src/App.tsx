import React, { useState, useEffect, useCallback, useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './style.css'
import PageContent from './components/PageContent'
import ItemsGrid from './components/ItemsGrid'
import User from './models/user'
import Product from './models/product'
import ProductsContextProvider from './store/product-context'
import CartItemType from './models/CartItemType'
import CartPage from './components/Cart/CartPage'
function App() {
  const [items, setItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
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
      //--------------------------------------------------------------------------
      setItems(transformedMovies)
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
  //----------------------------------------------------------------------------------
  useEffect(() => {
    fetchItemsHandler()
    fetchUserHandler()
  }, [fetchItemsHandler, fetchUserHandler])
  //----------------------------------------------------------------------------------

  const handleSearch = (query: string) => {
    const filteredResults = items.filter(
      (product) =>
        product.title.includes(query) ||
        product.description.includes(query) ||
        product.category.includes(query)
    )
    setFilteredProducts(filteredResults)
  }
  //-------------------------------handle cart----------------------------------------
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.quantity, 0)
  //----------------------------------------------------------------------------------
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.quantity + 1 }
            : item
        )
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }
  //----------------------------------------------------------------------------------
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack
          return [...ack, { ...item, amount: item.quantity - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    )
  }
  //----------------------------------------------------------------------------------

  let content: any = <p>Found no movies.</p>
  let pageContent: any = <p>Found no user.</p>

  if (user !== null) {
    pageContent = (
      <PageContent
        user={user}
        onSearch={handleSearch}
        cartItems={cartItems}
        getTotalItems={getTotalItems}
      />
    )
  }

  //----------------------------------------------------------------------------------

  if (items.length > 0) {
    // productsCtx.loadProductsToList(items)
    // console.log(productsCtx.items.length)
    content = (
      <ItemsGrid
        shoppingItems={filteredProducts.length > 0 ? filteredProducts : items}
        addToCart={handleAddToCart}
      />
    )
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  //----------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <section>{pageContent}</section>
      <section className='container py-3 px-5 grid'>{content}</section>
      {/* <CartPage
        addToCart={handleAddToCart}
        cartItems={cartItems}
        removeFromCart={handleRemoveFromCart}
      /> */}
    </React.Fragment>
  )
}

export default App
