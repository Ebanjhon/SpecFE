import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import { useReducer } from 'react';
import UserReducer from './Configs/UserReducer';
import Login from './Components/User/Login.js';

function App() {

    const [user, useDispatch] = useReducer(UserReducer, null);

    return (
        <BrowserRouter>
            <Routes>
                {user !== null ? (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path="/login" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path='/login' element={<Login />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
