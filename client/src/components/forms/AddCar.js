import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_CAR } from '../../graphql/queries';

const AddCarForm = ({ contactId, onCompleted }) => {
  const [addCar] = useMutation(ADD_CAR, { onCompleted });

  const handleSubmit = (values) => {
    addCar({ variables: { ...values, contactId } });
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} style={{justifyContent:'center'}}>
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
        <Input placeholder="Price" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Add Car</Button>
    </Form>
  );
};

export default AddCarForm;
