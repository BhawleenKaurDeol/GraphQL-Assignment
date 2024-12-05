import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import AddContact from './components/forms/AddContact'
import Contacts from './components/lists/Contacts'
import AddCarForm from './components/forms/AddCar'
import RemoveContact from './components/buttons/RemoveContact'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
client.resetStore();
const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title />
        <AddContact/>
        <AddCarForm />
        <Contacts />
      </div>
    </ApolloProvider>
  )
}

export default App