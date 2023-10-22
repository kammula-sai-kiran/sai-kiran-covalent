import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Card.css';

const CustomCard = (props) => {
  const {cardData, variant} = props;
  return (
    <Card className={`card custom-card ${variant}`}>
      <Card.Body className='card-body'> 
        {/* <Card.Title className="card-title">Card Title</Card.Title> */}
        <Card.Text className='card-text'>
        {cardData}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
