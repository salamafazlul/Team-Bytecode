import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './card.css';

export default function Topselling() {
  return (
    <div>
        <CardGroup >
            <Card className='cardBody2'>
                <Card.Body>
                <img src={require('../images/3.jpg') } width="85%" className="image1" />
                <h1></h1>
                <Card.Title>Product 1</Card.Title>
                </Card.Body>
            </Card>

            <Card className='cardBody2'>
                <Card.Body>
                <img src={require('../images/4.jpg') } width="25%" className="image1" />
                <h1></h1>
                <Card.Title>Product 2</Card.Title>
                </Card.Body>
            </Card>

            <Card className='cardBody2'>
                <Card.Body>
                <img src={require('../images/5.jpg') } width="85%" className="image1" />
                <h1></h1>
                <Card.Title>Product 3</Card.Title>
                </Card.Body>
            </Card>

            <Card className='cardBody2'>
                <Card.Body>
                <img src={require('../images/6.jpg') } width="85%" className="image1" />
                <h1></h1>
                <Card.Title>Product 4</Card.Title>
                </Card.Body>
            </Card>

    </CardGroup>
      
    </div>
  )
}
