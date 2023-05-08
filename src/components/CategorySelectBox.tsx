const CategorySelectBox = () => {
  return (
    <div className='col-span-2'>
      <select
        id='select'
        className='h-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
      >
        <option selected>Category</option>
        <option value='1'>Makeup cosmetics</option>
        <option value='2'>Skin care cosmetics</option>
        <option value='3'>Hair care products</option>
      </select>
    </div>
  )
}

export default CategorySelectBox
