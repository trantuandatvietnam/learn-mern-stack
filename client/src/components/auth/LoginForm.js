import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import AlertMessage from '../Alert';

const LoginForm = () => {
    const [alert, setAlert] = useState(null);

    const { loginUser } = useContext(AuthContext);
    const [loginForm, setFormLogin] = useState({
        username: '',
        password: '',
    });

    // function
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(loginForm);
            if (!res.success) {
                setAlert({ type: 'danger', message: res.message });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            }
        } catch (error) {
            console.log('err', error);
        }
    };

    const changeLoginForm = (e) => {
        setFormLogin({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Form onSubmit={handleLogin}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control
                        onChange={changeLoginForm}
                        value={loginForm.username}
                        name="username"
                        type="username"
                        placeholder="Enter user name"
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control
                        onChange={changeLoginForm}
                        value={loginForm.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className="mt-3">
                Dont have an account? Register now!{' '}
                <Link to="/register">Register</Link>
            </p>
        </>
    );
};

export default LoginForm;
