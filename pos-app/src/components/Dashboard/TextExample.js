import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './card.css';


function TextExample() {
  return (
    <CardGroup >
      <Card className='cardBody'>
        <Card.Body>
          <Card.Title>Daily Sales</Card.Title>
          <img src={require('../images/13.png') } width="25%" className="image" />
          <h3>$45000</h3>
        </Card.Body>
      </Card>

      <Card className='cardBody'>
        <Card.Body>
          <Card.Title>Total catogories</Card.Title>
          <img src={require('../images/17.png') } width="25%" className="image" />
          <h3>100</h3>
        </Card.Body>
      </Card>

      <Card className='cardBody'>
        <Card.Body>
          <Card.Title>Total Revenue</Card.Title>
          <img src={require('../images/14.png') } width="25%" className="image" />
          <h3>$45000</h3>
        </Card.Body>
      </Card>

      <Card className='cardBody'>
        <Card.Body>
          <Card.Title>Total Profit</Card.Title>
          <img src={require('../images/11.png') } width="25%" className="image" />
          <h3>$45000</h3>
        </Card.Body>
      </Card>
    </CardGroup>
    
  );
}

export default TextExample;