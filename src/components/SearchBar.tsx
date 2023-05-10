import { useState, useRef, useContext } from 'react'
import { ProductsContext } from '../store/product-context'

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const productsCtx = useContext(ProductsContext)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const enteredText = searchInputRef.current!.value
    if (enteredText.trim().length === 0) {
      // throw an error
      return
    }

    productsCtx.searchProduct(enteredText)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className='flex items-center border border-gray-400 rounded'>
      <button
        id='search-btn'
        type='button'
        className='flex-none p-2  border-gray-400'
        onClick={handleSearch}
      >
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
        className='flex-1 p-2 border-l border-gray-400 focus:outline-none'
        placeholder='Search'
        value={searchTerm}
        ref={searchInputRef}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default SearchBar