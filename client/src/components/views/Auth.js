import React, { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';

const Auth = () => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [navigate, isAuthenticated]);

    let body;
    if (authLoading) {
        body = (
            <>
                <Spinner variant="success" animation="grow" />
            </>
        );
    } else {
        body = <Outlet />;
    }
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="mb-4">Learn it</h1>
                    <h4 className="mb-4">
                        Keep track of what you are learning
                    </h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
