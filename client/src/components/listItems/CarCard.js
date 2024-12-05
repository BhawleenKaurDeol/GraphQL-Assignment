// import { Card } from 'antd';

// const CarCard = ({ year, make, model, price }) => (
//   <Card style={{ margin: '10px 0' }}>
//     <div>{year} {make} {model}</div>
//     <div>Price: ${price}</div>
//   </Card>
// );

// export default CarCard;


import { Card, Button } from 'antd';

const CarCard = ({ year, make, model, price, onEdit, onRemove }) => (
  <Card style={{ margin: '10px 0', width:'70rem'}} actions={[
    <Button type="link" onClick={onEdit}>Edit</Button>,
    <Button type="link" danger onClick={onRemove}>Remove</Button>,
  ]}>
    <div>{year} {make} {model}</div>
    <div>Price: ${price}</div>
  </Card>
);

export default CarCard;
