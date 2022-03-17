import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Landing from './components/layout/Landing';
import About from './components/views/About';
import Auth from './components/views/Auth';
import Dashboard from './components/views/Dashboard';
import AuthContextProvider from './context/AuthContextProvider';
import PostContextProvider from './context/PostContext';

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Landing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Auth />}>
                            <Route path="login" element={<LoginForm />} />
                            <Route path="register" element={<RegisterForm />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
