import { Card } from 'antd'
import RemoveContact from '../buttons/RemoveContact'
import CarCard from '../listItems/CarCard'
import { useState } from 'react'
import UpdateContact from '../forms/UpdateContact'
import { EditOutlined } from '@ant-design/icons'

const ContactCard = props => {
  const [editMode, setEditMode] = useState(false)
  const {id, firstName, lastName } = props
  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }
  console.log("ContactCard id:", id);


  return (
    <div>
      {editMode ? (
        <UpdateContact
        id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

export default ContactCard








// import { useQuery } from '@apollo/client';
// import { GET_PERSON_WITH_CARS } from '../../graphql/queries';
// import { Card, Spin } from 'antd';
// import CarCard from './CarCard'; // Adjust the path as necessary

// const ContactCard = ({ id, firstName, lastName }) => {
//   const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
//     variables: { id },
//   });

//   if (loading) return <Spin />;
//   if (error) return <div>Error fetching cars: {error.message}</div>;

//   const { cars } = data.People; // Adjust based on your actual query structure

//   return (
//     <Card title={`${firstName} ${lastName}`}>
//       {cars.map(car => (
//         <CarCard key={car.id} car={car} />
//       ))}
//     </Card>
//   );
// };

// export default ContactCard;







// import { useQuery } from '@apollo/client';
// import { GET_PERSON_WITH_CARS } from '../../graphql/queries';
// import { Card, Spin } from 'antd';
// import CarCard from './CarCard'; // Adjust the path as necessary

// const ContactCard = ({ id, firstName, lastName }) => {
//   const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
//     variables: { id }, // Pass the id variable to the query
//   });

//   if (loading) return <Spin />;
//   if (error) return <div>Error fetching cars: {error.message}</div>;

//   // Access the person object from the response
//   const { cars } = data.person; // Assuming the response structure includes person

//   return (
//     <Card title={`${firstName} ${lastName}`}>
//       {cars && cars.length > 0 ? (
//         cars.map(car => (
//           <CarCard key={car.id} car={car} />
//         ))
//       ) : (
//         <p>No cars owned</p>
//       )}
//     </Card>
//   );
// };

// export default ContactCard;

