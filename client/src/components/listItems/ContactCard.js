// import { Card } from 'antd'
// import RemoveContact from '../buttons/RemoveContact'
// import CarCard from '../listItems/CarCard'
// import { useState } from 'react'
// import UpdateContact from '../forms/UpdateContact'
// import { EditOutlined } from '@ant-design/icons'

// const ContactCard = props => {
//   const [editMode, setEditMode] = useState(false)
//   const {id, firstName, lastName } = props
//   const styles = getStyles()

//   const handleButtonClick = () => {
//     setEditMode(!editMode)
//   }
//   console.log("ContactCard id:", id);


//   return (
//     <div>
//       {editMode ? (
//         <UpdateContact
//         id={id}
//           firstName={firstName}
//           lastName={lastName}
//           onButtonClick={handleButtonClick}
//         />
//       ) : (
//         <Card
//           style={styles.card}
//           actions={[
//             <EditOutlined key='edit' onClick={handleButtonClick} />,
//             <RemoveContact id={id} firstName={firstName} lastName={lastName} />
//           ]}
//         >
//           {firstName} {lastName}
//         </Card>
//       )}
//     </div>
//   )
// }

// const getStyles = () => ({
//   card: {
//     width: '500px'
//   }
// })

// export default ContactCard








// // import { useQuery } from '@apollo/client';
// // import { GET_PERSON_WITH_CARS } from '../../graphql/queries';
// // import { Card, Spin } from 'antd';
// // import CarCard from './CarCard'; // Adjust the path as necessary

// // const ContactCard = ({ id, firstName, lastName }) => {
// //   const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
// //     variables: { id },
// //   });

// //   if (loading) return <Spin />;
// //   if (error) return <div>Error fetching cars: {error.message}</div>;

// //   const { cars } = data.People; // Adjust based on your actual query structure

// //   return (
// //     <Card title={`${firstName} ${lastName}`}>
// //       {cars.map(car => (
// //         <CarCard key={car.id} car={car} />
// //       ))}
// //     </Card>
// //   );
// // };

// // export default ContactCard;







// // import { useQuery } from '@apollo/client';
// // import { GET_PERSON_WITH_CARS } from '../../graphql/queries';
// // import { Card, Spin } from 'antd';
// // import CarCard from './CarCard'; // Adjust the path as necessary

// // const ContactCard = ({ id, firstName, lastName }) => {
// //   const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
// //     variables: { id }, // Pass the id variable to the query
// //   });

// //   if (loading) return <Spin />;
// //   if (error) return <div>Error fetching cars: {error.message}</div>;

// //   // Access the person object from the response
// //   const { cars } = data.person; // Assuming the response structure includes person

// //   return (
// //     <Card title={`${firstName} ${lastName}`}>
// //       {cars && cars.length > 0 ? (
// //         cars.map(car => (
// //           <CarCard key={car.id} car={car} />
// //         ))
// //       ) : (
// //         <p>No cars owned</p>
// //       )}
// //     </Card>
// //   );
// // };

// // export default ContactCard;




import { Card, Button, Spin } from 'antd';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PERSON_WITH_CARS } from '../../graphql/queries'; // Replace with your actual query
import { ADD_CAR, UPDATE_CAR, REMOVE_CAR } from '../../graphql/queries'; // Replace with actual mutations
import RemoveContact from '../buttons/RemoveContact';
import UpdateContact from '../forms/UpdateContact';
import CarCard from './CarCard';
import { EditOutlined } from '@ant-design/icons';
import AddCarForm from '../forms/AddCar'; // Assume a form component for adding cars
import UpdateCarForm from '../forms/UpdateCar'; // Assume a form component for editing cars

const ContactCard = ({ id, firstName, lastName }) => {
  const [editMode, setEditMode] = useState(false);
  const [editCarId, setEditCarId] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  const [removeCar] = useMutation(REMOVE_CAR, {
    onCompleted: refetch,
  });

  const toggleEditContact = () => setEditMode(!editMode);
  const handleCarEdit = (carId) => setEditCarId(carId);
  const handleCarEditCancel = () => setEditCarId(null);

  if (loading) return <Spin />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const { cars } = data.person || {};

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={toggleEditContact}
        />
      ) : (
        <Card
        style={{ padding:'0 20rem 0 20rem'}}
          title={`${firstName} ${lastName}`}
          actions={[
            <EditOutlined key="edit" onClick={toggleEditContact} />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />,
          ]}
        >
          <h3>Cars:</h3>
          {cars && cars.length > 0 ? (
            cars.map((car) =>
              editCarId === car.id ? (
                <UpdateCarForm
                  key={car.id}
                  car={car}
                  onCancel={handleCarEditCancel}
                  onCompleted={refetch}
                />
              ) : (
                <CarCard
                  key={car.id}
                  year={car.year}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                  onEdit={() => handleCarEdit(car.id)}
                  onRemove={() => removeCar({ variables: { id: car.id } })}
                />
              )
            )
          ) : (
            <p>No cars owned</p>
          )}
          {/* <AddCarForm contactId={id} onCompleted={refetch} /> */}
        </Card>
      )}
    </div>
  );
};

export default ContactCard;
