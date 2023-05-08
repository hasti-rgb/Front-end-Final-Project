import Header from './Header'
import NavigationBar from './NavigationBar'
interface User {
  name: {
    firstname: string
    lastname: string
  }
}
const PageContent: React.FC<User> = ({ name }) => {
  return (
    <div>
      <Header name={name} />
      <NavigationBar />
    </div>
  )
}

export default PageContent
