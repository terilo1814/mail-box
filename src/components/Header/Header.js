import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../../states/Reducers/AuthReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        localStorage.clear()
        navigate('/')

    }

    return (
        <Navbar bg="light" expand="lg" className="fixed-top">
            <Container>
                <Navbar.Brand href="#home" style={{ color: 'blue', fontFamily: 'sans-serif' }}>Mail Box Client</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Compose </Nav.Link>
                        <Nav.Link href="#link">Inbox</Nav.Link>
                        <Nav.Link href="#link">Sent Mail</Nav.Link>
                    </Nav>
                    <Button variant="primary" onClick={logoutHandler}>Log Out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

