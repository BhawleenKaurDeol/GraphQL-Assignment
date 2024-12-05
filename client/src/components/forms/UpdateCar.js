import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR } from '../../graphql/queries';

const UpdateCarForm = ({ car, onCancel, onCompleted }) => {
  const [updateCar] = useMutation(UPDATE_CAR, { onCompleted });

  const handleSubmit = (values) => {
    updateCar({ variables: { id: car.id, ...values } });
    onCancel();
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} initialValues={car}>
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
      <Button type="primary" htmlType="submit">Save</Button>
      <Button type="link" onClick={onCancel}>Cancel</Button>
    </Form>
  );
};

export default UpdateCarForm;
