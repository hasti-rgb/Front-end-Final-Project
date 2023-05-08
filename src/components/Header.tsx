const handleUserClick = () => {}

interface UserProps {
  name: {
    firstname: string
    lastname: string
  }
}
const Header: React.FC<UserProps> = ({ name }) => {
  return (
    <div className='container-fluid bg-gray-400 py-3 px-sm-5'>
      <header id='header' className='flex items-center'>
        <div className='flex-1 text-start mb-lg-0'>
          <div className='flex items-center'>
            <img
              src='img_508630.png'
              alt='Profile'
              className='w-12 h-12 object-cover rounded-full'
              onClick={() => handleUserClick()}
            />
            <p className='xs:block ms-3'>Hi, {name.firstname}</p>
          </div>
        </div>
        <div className='flex-1 text-center'>
          <div className='logo-container px-lg-5'>
            <p id='logo' className='logo py-3 mx border border-dark'>
              Cosmetic Shop
            </p>
          </div>
        </div>
        <div className='flex-1 text-end'>
          <div className='p-2 flex justify-end items-center'>
            <p className='mx-1 my-2'>Cart</p>
            <div className='rounded-full bg-red-500 text-white w-8 h-8 flex justify-center items-center'>
              0
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
