import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import brand from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import { AuthContext } from '../../context/AuthContextProvider';

const NavbarHeader = () => {
    const {
        authState: { user },
        logoutUser,
    } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand className="text-white">
                    <img
                        width="32"
                        height="32"
                        className="mr-2"
                        src={brand}
                        alt="logo"
                    />
                    Learn mearn
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            className="text-white"
                            to="/dashboard"
                            as={Link}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className="text-white" to="/about" as={Link}>
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="text-white" disabled>
                            Welcome {user.username}
                        </Nav.Link>
                        <Button onClick={handleLogout} variant="secondary">
                            <img
                                width="32"
                                height="32"
                                className="mr-2"
                                src={logout}
                                alt=""
                            />
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarHeader;
