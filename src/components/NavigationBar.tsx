import SearchBar from './SearchBar'
import CategorySelectBox from './CategorySelectBox'
interface Props {
  onSearch: (query: string) => void
  categories: string[]
  onfilter: (query: string) => void
}
const NavigationBar: React.FC<Props> = ({ onSearch, categories, onfilter }) => {
  return (
    <div className='grid lg:grid-cols-4 xl:grid-cols-3 xl:gap-4 xl:py-5 xl:px-5 my-5'>
      <SearchBar onSearch={onSearch} />
      <CategorySelectBox categories={categories} onfilter={onfilter} />
    </div>
  )
}

export default NavigationBar
