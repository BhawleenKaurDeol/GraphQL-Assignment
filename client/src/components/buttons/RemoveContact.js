import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE, REMOVE_PERSON } from '../../graphql/queries'
import filter from 'lodash.filter'

const RemoveContact = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { People } = cache.readQuery({ query: GET_PEOPLE })

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          People: filter(People, c => {
            return c.id !== removePerson.id
          })
        }
      })
    }
  });
  
//

  const handleButtonClick = () => {
    console.log("Deleting person with id:", id);
    let result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        }
      })
    }
  }
  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveContact