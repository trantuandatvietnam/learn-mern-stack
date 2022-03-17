import React, { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="grow" variant="light" />
            </div>
        );
    }

    return <>{isAuthenticated && <Component {...rest} />}</>;
};

export default ProtectedRoute;
