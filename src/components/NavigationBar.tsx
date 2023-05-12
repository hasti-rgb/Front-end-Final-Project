import SearchBar from './SearchBar'
import CategorySelectBox from './CategorySelectBox'
interface Props {
  onSearch: (query: string) => void
  categories: string[]
  onfilter: (query: string) => void
}
const NavigationBar: React.FC<Props> = ({ onSearch, categories, onfilter }) => {
  return (
    <div className='grid grid-cols-3 gap-4 py-5 px-5 my-5'>
      <SearchBar onSearch={onSearch} />
      <CategorySelectBox categories={categories} onfilter={onfilter} />
    </div>
  )
}

export default NavigationBar
