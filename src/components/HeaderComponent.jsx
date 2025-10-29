import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const HeaderComponent = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">Gallery</Navbar.Brand>
        </Container>
    </Navbar>
  )
}

export default HeaderComponent