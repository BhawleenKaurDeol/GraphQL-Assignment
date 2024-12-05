// import { Form, Input, Button } from 'antd';
// import { useMutation } from '@apollo/client';
// import { ADD_CAR } from '../../graphql/queries';

// const AddCarForm = ({ contactId, onCompleted }) => {
//   const [addCar] = useMutation(ADD_CAR, { onCompleted });

//   const handleSubmit = (values) => {
//     addCar({ variables: { ...values, contactId } });
//   };

//   return (
//     <Form layout="inline" onFinish={handleSubmit} style={{justifyContent:'center'}}>
//       <Form.Item name="year" rules={[{ required: true, message: 'Year required' }]}>
//         <Input placeholder="Year" />
//       </Form.Item>
//       <Form.Item name="make" rules={[{ required: true, message: 'Make required' }]}>
//         <Input placeholder="Make" />
//       </Form.Item>
//       <Form.Item name="model" rules={[{ required: true, message: 'Model required' }]}>
//         <Input placeholder="Model" />
//       </Form.Item>
//       <Form.Item name="price" rules={[{ required: true, message: 'Price required' }]}>
//         <Input placeholder="Price" />
//       </Form.Item>
//       <Button type="primary" htmlType="submit">Add Car</Button>
//     </Form>
//   );
// };

// export default AddCarForm;


// import { Form, Input, Button, Select } from 'antd';
// import { useMutation } from '@apollo/client';
// import { ADD_CAR } from '../../graphql/queries';

// const AddCarForm = ({ contactId, personId, onCompleted, people }) => {
//   const [addCar] = useMutation(ADD_CAR, { onCompleted });
//    people = [
//     { id: '1', name: 'John Doe' },
//     { id: '2', name: 'Jane Smith' },
//     { id: '3', name: 'Alice Johnson' },
//   ];

//   const handleSubmit = (values) => {

      
//     addCar({
//       variables: {
//         ...values,
//         contactId, // existing contactId
//         personId: values.personId,  // use personId from form selection
//       },
//     });
//   };

//   return (
//     <Form layout="inline" onFinish={handleSubmit} style={{ justifyContent: 'center' }}>
//       <Form.Item name="year" rules={[{ required: true, message: 'Year required' }]}>
//         <Input placeholder="Year" />
//       </Form.Item>
//       <Form.Item name="make" rules={[{ required: true, message: 'Make required' }]}>
//         <Input placeholder="Make" />
//       </Form.Item>
//       <Form.Item name="model" rules={[{ required: true, message: 'Model required' }]}>
//         <Input placeholder="Model" />
//       </Form.Item>
//       <Form.Item name="price" rules={[{ required: true, message: 'Price required' }]}>
//         <Input placeholder="Price" />
//       </Form.Item>
      
//       {/* Select Field for Choosing Person */}
//       <Form.Item name="personId" rules={[{ required: true, message: 'Please select a person!' }]}>
//         <Select placeholder="Select Person" style={{ width: 200 }}>
//           {people.map((person) => (
//             <Select.Option key={person.id} value={person.id}>
//               {person.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Button type="primary" htmlType="submit">Add Car</Button>
//     </Form>
//   );
// };

// export default AddCarForm;


import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate a unique id
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../graphql/queries'; // Adjust the path according to your project structure

const AddCarForm = ({ contactId, onCompleted }) => {
  const [addCar] = useMutation(ADD_CAR, { onCompleted });

  // Fetch all people from the backend
  const { data: peopleData, loading: peopleLoading, error: peopleError } = useQuery(GET_PEOPLE);

  const handleSubmit = async (values) => {
    try {
      // Generate a unique ID for the car
      const carId = uuidv4();

      // Call the mutation with the carId and other form values
      await addCar({
        variables: {
          id: carId, // Pass the generated ID
          ...values,
          contactId,
        },
        update: (cache, { data: { addCar } }) => {
          // Read the current cars data from the cache
          const existingCars = cache.readQuery({ query: GET_CARS });

          // Update the cache by adding the new car to the list
          cache.writeQuery({
            query: GET_CARS,
            data: {
              ...existingCars,
              cars: [...existingCars.cars, addCar], // Add the new car to the cars list
            },
          });
        },
      });

      notification.success({ message: 'Car added successfully!' });
    } catch (error) {
      notification.error({ message: 'Error adding car', description: error.message });
    }
  };

  if (peopleLoading) return <div>Loading people...</div>;
  if (peopleError) return <div>Error loading people!</div>;

  return (
    <Form layout="inline" onFinish={handleSubmit} style={{ justifyContent: 'center' }}>
      <Form.Item name="year" rules={[{ required: true, message: 'Year required' }]}>
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item name="make" rules={[{ required: true, message: 'Make required' }]}>
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item name="model" rules={[{ required: true, message: 'Model required' }]}>
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: 'Price required' }]}>
        <Input placeholder="$" />
      </Form.Item>

      {/* Select Field for Choosing Person */}
      <Form.Item name="personId" rules={[{ required: true, message: 'Please select a person!' }]}>
        <Select placeholder="Select Person" style={{ width: 200 }}>
          {peopleData.People.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Add Car
      </Button>
    </Form>
  );
};

export default AddCarForm;



