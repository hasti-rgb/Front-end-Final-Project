import Header from './Header'
import NavigationBar from './NavigationBar'
import User from '../models/user'
import React from 'react'
interface Props {
  onSearch: (query: string) => void
}
const PageContent: React.FC<User & Props> = (
  { id, name, username, password, email, address, phone },
  props
) => {
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
      <NavigationBar onSearch={props.onSearch} />
    </div>
  )
}

export default PageContent
