import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
  <Navbar expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">Gallery</Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default HeaderComponent