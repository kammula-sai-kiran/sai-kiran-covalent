import React from 'react';
import Card from 'react-bootstrap/Card';

import './Card.css';

const CustomCard = (props) => {
  const {cardData, variant} = props;
  return (
    <Card className={`card custom-card ${variant}`}>
      <Card.Body className='card-body text-center'> 
        {cardData}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
