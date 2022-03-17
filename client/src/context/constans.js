export const API_URL =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'https://mern-stack-lern.herokuapp.com/api';
export const LOCAL_STORAGE_TOKEN_NAME = 'learn-mern';
