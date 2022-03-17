import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    });
    return <div>Lading page</div>;
};

export default Landing;
