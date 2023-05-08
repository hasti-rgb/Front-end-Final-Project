import SearchBar from './SearchBar'
import CategorySelectBox from './CategorySelectBox'

const NavigationBar = () => {
  return (
    <div className='grid grid-cols-4 gap-4 py-3 px-5'>
      <SearchBar />
      <CategorySelectBox />
    </div>
  )
}

export default NavigationBar
