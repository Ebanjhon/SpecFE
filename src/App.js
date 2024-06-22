import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
import UserDetail from './Components/User/UserDetail.js';
import SpecDetail from './Components/SpecificationDetail/SpecDetail.js';
import ViewFile from './Components/ViewFile.js';
import CreateSpec from './Components/SpecificationDetail/CreateSpec.js';
import UpdateUser from './Components/User/UpdateUser.js';
import MySpec from './Components/MySpec/MySpec.js';
import PageNotFound from './Components/Page404/PageNotFound.js';

function App() {
    // hàm lấy user trong sessionStore
    const getUser = () => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    };

    const [user, useDispatch] = useReducer(UserReducer, getUser());

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, useDispatch]}>
                <Navbar />
                <Routes>
                    {user !== null ? ( // có user
                        <>
                            <Route path="/login" element={<Navigate to="/" />} />
                            <Route path='/logout' element={<Sighout />} />
                            <Route path='/update-user' element={<UpdateUser />} />
                            <Route path='/user-infor' element={<UserDetail />} />
                            {user.avatar === null ? <>
                                <Route path="/" element={<Navigate to="/user-infor" />} />
                            </> : <>
                                <Route path='/' element={<Home />} />
                                <Route path='/chat' element={<Chat />} />
                                <Route path='/spec-editer' element={<CreateSpec />} />
                                <Route path='/view-file' element={<ViewFile />} />
                                <Route path='/My-spec' element={<MySpec />} />
                                <Route path='/display-spec' element={<SpecDetail />} />
                            </>}
                        </>
                    ) : ( // không có user
                        <>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/logout" element={<Navigate to="/login" />} />
                        </>
                    )}
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <Footer />
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
