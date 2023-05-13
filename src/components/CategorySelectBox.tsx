interface Props {
  categories: string[]
  onfilter: (query: string) => void
}

const CategorySelectBox: React.FC<Props> = ({ categories, onfilter }) => {
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuery = event.target.value
    onfilter(newQuery)
  }
  return (
    <div className='my-5 px-7 xl:px-3 '>
      <select
        onChange={handleFilter}
        id='select'
        className='w-full border-b border-slate-800 h-10 rounded-md  focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
      >
        <option selected>Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategorySelectBox
