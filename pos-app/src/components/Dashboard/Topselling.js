import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './card.css';

export default function Topselling({data}) {
    console.log(data);
    return (
        <div>
            <CardGroup>
                {data?.map(product => {
                    return (
                        <Card key={product.product.product_id} className='cardBody2'>
                            <Card.Body>
                                <h1></h1>
                                <Card.Title>{product.product.product_name}</Card.Title>
                                <p>Quantity: {product.quantity}</p>
                            </Card.Body>
                        </Card>
                    )
                })}
            </CardGroup>

        </div>
    )
}
