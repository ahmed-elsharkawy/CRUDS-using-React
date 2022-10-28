import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function MyNav() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CRUDS</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNav;
