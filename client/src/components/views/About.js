import React, { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import NavbarHeader from '../layout/Navbar';

const About = () => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="grow" variant="light" />
            </div>
        );
    }
    return (
        <>
            {isAuthenticated && (
                <div>
                    <NavbarHeader /> About
                </div>
            )}
        </>
    );
};

export default About;
