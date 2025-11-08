import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from  'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useFetchProgress } from '../../custom-hooks/FetchData';

export const NavBar = ({ progress }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const currentProgress = progress !== null && progress !== undefined ? progress : 0;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

  return (
    <div>
        <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Nexopedia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/database">Database</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/guides">Guides</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/items">Items</Nav.Link>
                        </Nav.Item>
                        {token ? (
                            <>
                                    <Nav.Item>
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                </Nav.Item>
                                    <Nav.Item className="mx-3 my-2 d-flex align-items-center">
                                        <span className="text-light me-2">Database Completion: </span>
                                        <ProgressBar
                                            now={currentProgress}
                                            label={`${currentProgress}%`}
                                            style={{ width: "150px", height: "15px" }}
                                            variant="success"
                                        />
                                    </Nav.Item>
                                <Nav.Item>
                                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                                </Nav.Item>
                            </>
                        ) : (
                            <>
                            <Nav.Item>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
};
