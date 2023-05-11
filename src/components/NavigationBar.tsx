import SearchBar from './SearchBar'
import CategorySelectBox from './CategorySelectBox'
interface Props {
  onSearch: (query: string) => void
}
const NavigationBar: React.FC<Props> = (props) => {
  return (
    <div className='grid grid-cols-4 gap-4 py-3 px-5'>
      <SearchBar onSearch={props.onSearch} />
      <CategorySelectBox />
    </div>
  )
}

export default NavigationBar
