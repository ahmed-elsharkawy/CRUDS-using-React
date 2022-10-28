import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function ViewUser({data}) {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.userImage} />
      <Card.Body>
        <Card.Title>{`${data.firstName} ${data.lastName}`}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroup.Item>Age: {data.userAge}</ListGroup.Item>
        <ListGroup.Item> Email: {data.email}</ListGroup.Item>
        <ListGroup.Item> Address: {data.address}</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>
  )
}

export default ViewUser