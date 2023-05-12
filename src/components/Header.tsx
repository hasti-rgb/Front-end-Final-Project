import User from '../models/user'
import React, { useState } from 'react'
import Product from '../models/product'
import { Link } from 'react-router-dom'
interface HeaderProps {
  user: User
  cartItems: Product[]
  getTotalItems: (items: Product[]) => any
}
const handleUserClick = () => {}

const Header: React.FC<HeaderProps> = ({ user, cartItems, getTotalItems }) => {
  return (
    <div className='container bg-gray-200 px-8 py-3  px-sm-5'>
      <header id='header' className='flex items-center'>
        <div className='flex-1 text-start mb-lg-0'>
          <div className='flex items-center '>
            <img
              src='img_508630.png'
              alt='Profile'
              className='w-12 h-12 object-cover rounded-full '
              onClick={() => handleUserClick()}
            />
            <p className='xs:block ms-3 hover:border border-b-indigo-500'>
              Hi, {user.username}
            </p>
          </div>
        </div>
        <div className='flex-1 text-center'>
          <Link to='/'>
            <div className='logo-container px-lg-5 hover:bg-white'>
              <p id='logo' className='logo py-3 mx border border-black'>
                Online Shop
              </p>
            </div>
          </Link>
        </div>
        <div className='flex-1 text-end'>
          <Link to='/cart'>
            <div className='p-2 flex justify-end items-center '>
              <div className='min-w-fit flex items-center hover:border border-b-indigo-500'>
                <p className='mx-1 my-2 text-lg '>Cart</p>
                <div className='rounded-full bg-red-500 text-white w-6 h-6 flex justify-center items-center'>
                  {getTotalItems(cartItems)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Header
