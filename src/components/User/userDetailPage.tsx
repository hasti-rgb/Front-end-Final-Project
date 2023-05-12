import User from '../../models/user'

interface userDetailProps {
  user: User
}

const UserDetailPage: React.FC<userDetailProps> = ({ user }) => {
  return (
    <div className='p-5 flex justify-items-center content-center text-center place-content-center'>
      <div className=' p-5 border-4 outline-double outline-3 outline-offset-2 border-gray-500 w-fit place-content-center'>
        <p className='mb-5'>
          Full Name: {user.name.firstname} {user.name.lastname}
        </p>
        <p className='mb-5'>Username: {user.username}</p>
        <p className='mb-5'>Email: {user.email}</p>
        <p className='mb-5'>Phone: {user.phone}</p>
        <p className='mb-5'>
          Address: {user.address.city},{user.address.street},
          {user.address.number}
        </p>
        <p>Zipcode: {user.address.zipcode}</p>
      </div>
    </div>
  )
}

export default UserDetailPage
