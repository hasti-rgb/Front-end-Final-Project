import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import React, { useState, useEffect, useCallback, useContext } from 'react'
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

  const handleSearch = (query: string) => {
    const filteredResults = items.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filteredResults)
  }
  //----------------------------------------------------------------------------------
  const handleFilter = (category: string) => {
    const filteredResults = items.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    )
    console.log('filteredResults lnegth =>' + filteredResults.length)
    setFilteredProducts(filteredResults)
  }
  //-------------------------------handle cart----------------------------------------
  const getTotalItems = (items: Product[]) =>
    items.reduce((ack: number, item) => ack + item.quantity, 0)
  //----------------------------------------------------------------------------------
  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)
      console.log('isItemInCart: ' + isItemInCart?.title)
      // const qty: number = isItemInCart ? isItemInCart.quantity + 1 : 1
      if (isItemInCart) {
        console.log('isItemInCart qty: ' + isItemInCart.quantity)
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      console.log('clickedItem: ' + clickedItem.title)

      // First time the item is added
      return [...prev, { ...clickedItem, quantity: 1 }]
    })
    console.log('cart item length: ' + cartItems.length)
    console.log('clickedItem amount: ' + clickedItem.quantity)
  }
  //----------------------------------------------------------------------------------
  const handleDecrease = (id: number) => {
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
  }
  //----------------------------------------------------------------------------------
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          return ack
          // return [...ack, { ...item, quantity: item.quantity - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as Product[])
    )
  }
  //----------------------------------------------------------------------------------

  let content: any = <p>Found no movies.</p>
  let pageContent: any = <p>Found no user.</p>
  let userPage: any = <p>Found no user. </p>
  if (user !== null) {
    pageContent = (
      // <PageContent
      //   user={user}
      //   onSearch={handleSearch}
      //   cartItems={cartItems}
      //   getTotalItems={getTotalItems}
      // />

      <Header user={user} cartItems={cartItems} getTotalItems={getTotalItems} />
    )
    userPage = <UserDetailPage user={user} />
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
    // <React.Fragment>
    //   <section>{pageContent}</section>
    //   <section className='container py-3 px-5 grid'>{content}</section>
    //   {/* <CartPage
    //     addToCart={handleAddToCart}
    //     cartItems={cartItems}
    //     removeFromCart={handleRemoveFromCart}
    //   /> */}
    // </React.Fragment>

    <Router>
      <div>
        <section>{pageContent}</section>
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
                <section className='container py-3 px-5 grid'>
                  {content}
                </section>
              </React.Fragment>
            }
          />
          <Route path='/user-info' element={userPage} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
