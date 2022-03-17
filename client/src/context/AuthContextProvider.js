import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from '../reducer/AuthReducer';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from './constans';
import axios from 'axios';
import setAuthToken from '../ultis/setAuthToken';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });
    // authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${API_URL}/auth`);
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        authLoading: false,
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            } else {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        authLoading: false,
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    // login
    const loginUser = async (userForm) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, userForm);
            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                );
            }
            await loadUser();
            return res.data;
        } catch (error) {
            if (error.response.data) {
                // Lỗi trả ra trong server
                return error.response.data;
            } else {
                // Lỗi phát sinh khi thực hiện
                return {
                    success: false,
                    mess: error.message,
                };
            }
        }
    };

    // logout
    const logoutUser = async () => {
        localStorage.removeItem('learn-mern');
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
        });
    };

    // register
    const registerUser = async (registerForm) => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/register`,
                registerForm
            );
            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                );
            }
            await loadUser();
            return res.data;
        } catch (error) {
            if (error.response.data) {
                // Lỗi trả ra trong server
                return error.response.data;
            } else {
                // Lỗi phát sinh khi thực hiện
                return {
                    success: false,
                    mess: error.message,
                };
            }
        }
    };

    const authContextData = { loginUser, logoutUser, registerUser, authState };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) loadUser();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
