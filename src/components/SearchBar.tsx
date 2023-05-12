import React from 'react'

import { useState } from 'react'
interface Props {
  onSearch: (query: string) => void
}
const SearchBar: React.FC<Props> = (props) => {
  // const [searchTerm, setSearchTerm] = useState('')
  // const productsCtx = useContext(ProductsContext)
  // const searchInputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  // const handleSearch = (event: React.FormEvent) => {
  //   event.preventDefault()
  //   const enteredText = searchInputRef.current!.value
  //   if (enteredText.trim().length === 0) {
  //     // throw an error
  //     return
  //   }

  //   productsCtx.searchProduct(enteredText)
  // }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    props.onSearch(newQuery)
  }
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value)
  // }

  return (
    <div className='px-3'>
      <div className='flex items-center  border border-solid rounded-full border-black '>
        <button id='search-btn' type='button' className='flex-none p-2  '>
          <div className='inset-y-0 left-0 flex items-center  pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </div>
        </button>
        <input
          type='search'
          id='search-form'
          className='w-5/6 p-2  focus:outline-none'
          placeholder='Search'
          value={query}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchBar
