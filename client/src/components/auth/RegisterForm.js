import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import AlertMessage from '../Alert';

const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        cf_password: '',
    });
    const [alert, setAlert] = useState(null);

    const changeRegisterForm = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        if (registerForm.password !== registerForm.cf_password) {
            setAlert({
                type: 'danger',
                message: 'passwordConfirm is not match for password!',
            });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            console.log({ registerData });
            if (!registerData.success) {
                setAlert({
                    type: 'danger',
                    message: registerData.message,
                });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            }
        } catch (error) {
            console.log('err', error);
        }
    };
    return (
        <>
            <Form onSubmit={handleRegisterForm}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-4">
                    <Form.Control
                        onChange={changeRegisterForm}
                        value={registerForm.username}
                        name="username"
                        type="username"
                        placeholder="Enter user name"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Control
                        onChange={changeRegisterForm}
                        value={registerForm.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control
                        onChange={changeRegisterForm}
                        value={registerForm.cf_password}
                        name="cf_password"
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p className="mt-3">
                already have an account? Login now!{' '}
                <Link to="/login">Login</Link>
            </p>
        </>
    );
};

export default RegisterForm;
