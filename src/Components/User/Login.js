
import { Button, Form } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import './Login.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUnlock, FaLock, FaUser } from "react-icons/fa";
import { UserContext } from '../../Configs/Contexts';
const Login = () => {

    const [showValid, setShowValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userCurrent, dispatch] = useContext(UserContext);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    // hàm cập nhật nội dung
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    // hàm gọi login
    const login = (e) => {
        e.preventDefault();
        if (user.username === '' || user.password === '')
            setShowValid(true);
        else {
            sessionStorage.setItem('user', JSON.stringify(user));
            dispatch({
                "type": "login",
                "payload": user
            });
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='background-login d-flex justify-content-center align-items-center'>
            {showValid ? (
                <div class="alert alert-danger" style={{ minWidth: '470px' }} role="alert">
                    Mật khẩu và tên đăng nhập của bạn không chính xác!
                </div>
            ) : null}
            <div className='login-form'>

                <h1 className='d-flex justify-content-center align-items-center' style={{ fontSize: '50px', marginBottom: '20px' }}>Đăng Nhập</h1>
                {/* <p>Hệ thống quản lý và biên soạn đề cương.</p> */}
                <Form onSubmit={login}>
                    <Form.Group controlId="formUsername" className='label-input'>
                        <FaUser className='icon-login' />
                        <Form.Label className='lable'>Username</Form.Label>
                        <Form.Control
                            className='input-login'
                            type="text"
                            name="username"
                            placeholder="Nhập tên người dùng"
                            value={user.username}
                            onChange={handleChange}
                        />
                        <p className='show-mess'> {showValid && user.username === '' ? 'Vui lòng nhập tên đăng nhập.' : ''}</p>
                    </Form.Group>
                    <Form.Group controlId="formPassword" className='label-input' >
                        <span className="password-toggle eye" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaUnlock className='icon-login' /> : <FaLock className='icon-login' />}
                        </span>
                        <Form.Label className='lable'> Password</Form.Label>
                        <Form.Control
                            className='input-login'
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={user.password}
                            onChange={handleChange}
                            autoFocus={false}
                            style={{ border: 'none' }}
                        />

                        <p className='show-mess'> {showValid && user.password === '' ? 'Vui lòng nhập mật khẩu.' : ''}</p>
                    </Form.Group>

                    <Button variant="primary" type="submit" className='btn-log-regis'>
                        Sign in
                    </Button>

                </Form>
                <Link className='d-flex justify-content-center align-items-center' style={{ color: 'black', fontSize: '19px' }}>Forgot password</Link>
            </div>
        </div>
    )
}

export default Login;
