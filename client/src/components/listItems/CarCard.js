import { Card } from 'antd';

const CarCard = ({ year, make, model, price }) => (
  <Card style={{ margin: '10px 0' }}>
    <div>{year} {make} {model}</div>
    <div>Price: ${price}</div>
  </Card>
);

export default CarCard;
