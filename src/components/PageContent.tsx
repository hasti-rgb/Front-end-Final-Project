import Header from './Header'
import NavigationBar from './NavigationBar'
import User from '../models/user'
import React from 'react'

const PageContent: React.FC<User> = ({
  id,
  name,
  username,
  password,
  email,
  address,
  phone,
}) => {
  return (
    <div>
      <Header
        id={id}
        name={name}
        username={username}
        password={password}
        email={email}
        address={address}
        phone={phone}
      />
      <NavigationBar />
    </div>
  )
}

export default PageContent
