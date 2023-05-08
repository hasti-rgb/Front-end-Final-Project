interface UserProps {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

function User({ name, username, email, address, phone }: UserProps) {
  return (
    <div>
      <h2>User Information</h2>
      <p>
        Name: {name.firstname}
        {name.lastname}
      </p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>
        Address: {address.city}, {address.street}, {address.number},{' '}
        {address.zipcode}
      </p>
      <p>Phone: {phone}</p>
    </div>
  )
}
export default User
