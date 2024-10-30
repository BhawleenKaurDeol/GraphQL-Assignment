// import { useQuery } from '@apollo/client'
// import { GET_PEOPLE, GET_PERSON_WITH_CARS } from '../../graphql/queries'
// import { List } from 'antd'
// import ContactCard from '../listItems/ContactCard'

// const Contacts = () => {
//   const styles = getStyles()

//   const { loading, error, data } = useQuery(GET_PEOPLE)

//   if (loading) return 'Loading...'
//   if (error) return `Error! ${error.message}`

//   return (
//     <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
//       {data.People.map(({id, firstName, lastName }) => (
//         <List.Item key={id}>
//           <ContactCard id={id} firstName={firstName} lastName={lastName}/>

//         </List.Item>
//       ))}
//     </List>
//   )
// }

// const getStyles = () => ({
//   list: {
//     display: 'flex',
//     justifyContent: 'center'
//   }
// })

// export default Contacts













import { useQuery } from '@apollo/client';
import { GET_PEOPLE, GET_PERSON_WITH_CARS } from '../../graphql/queries'; // Update the import path if necessary
import { List } from 'antd';
import ContactCard from '../listItems/ContactCard';

const Contacts = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.People.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <ContactCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default Contacts;
