import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import { useEffect, useReducer } from 'react';
import UserReducer from './Configs/UserReducer';
import Login from './Components/User/Login.js';
import Navbar from './Components/Navbar/Navbar.js';
import Footer from './Components/Navbar/Footer.js';
import { UserContext } from './Configs/Contexts.js';
import Sighout from './Components/User/Sighout.js';
import Register from './Components/User/Register.js';
import Chat from './Components/Chat/Chat.js';

function App() {
    // hàm lấy user trong sessionStore
    const getUser = () => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    };

    const [user, useDispatch] = useReducer(UserReducer, null, getUser);

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, useDispatch]}>
                <Navbar />
                <Routes>
                    {user !== null ? (
                        <>
                            <Route path='/' element={<Home />} />
                            <Route path='/logout' element={<Sighout />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/chat' element={<Chat />} />
                            <Route path="/login" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path='/login' element={<Login />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/logout" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
                <Footer />
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
