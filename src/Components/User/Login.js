
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import cookie from "react-cookies";
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUnlock, FaLock, FaUser } from "react-icons/fa";
import { UserContext } from '../../Configs/Contexts';
import APIs, { authApi, endpoints } from '../../Configs/APIs';
const Login = () => {

    const [showValid, setShowValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userCurrent, dispatch] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
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
    const login = async (e) => {
        e.preventDefault();
        if (user.username === '' || user.password === '')// nếu user không nhập ý tự gì 
            setShowValid(true);
        else {
            setLoading(true);
            try {
                let response = await APIs.post(endpoints['login'], {
                    username: user.username,
                    password: user.password
                });
                cookie.save("token", response.data);

                setTimeout(async () => {
                    const u = await authApi().get(endpoints['current-user']);
                    sessionStorage.setItem('user', JSON.stringify(u.data));
                    dispatch({
                        "type": "login",
                        "payload": u.data
                    });
                }, 100);
            } catch (error) {
                console.error('Login failed:', error); // Xử lý lỗi đăng nhập
                if (error.code === 'ERR_NETWORK') {
                    alert("Lỗi server!");
                } else {
                    setShowValid(true);
                }

            } finally {
                setLoading(false)
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='background-login d-flex justify-content-center align-items-center chieucao'>
            {showValid && (
                <div className="alert alert-danger" style={{ minWidth: '470px' }} role="alert">
                    Mật khẩu và tên đăng nhập của bạn không chính xác!
                </div>
            )}
            <div className='login-form'>

                <h1 className='d-flex justify-content-center align-items-center' style={{ fontSize: '50px', marginBottom: '20px', fontFamily: "Bungee, sans-serif" }}>Đăng Nhập</h1>
                {/* <p>Hệ thống quản lý và biên soạn đề cương.</p> */}
                <Form onSubmit={login}>
                    <Form.Group controlId="formUsername" className='label-input' style={{ marginBottom: '20px' }}>
                        <FaUser className='icon-login' />
                        <Form.Label className='lable'>Username</Form.Label>
                        <Form.Control
                            className='input-login'
                            type="text"
                            name="username"
                            placeholder="Nhập tên người dùng"
                            value={user.username}
                            onChange={handleChange}
                            style={{ fontSize: '20px', fontWeight: '500' }}
                        />
                        <p className='show-mess'> {showValid && user.username === '' ? 'Vui lòng nhập tên đăng nhập.' : ''}</p>
                    </Form.Group>

                    <Form.Group controlId="formPassword" className='label-input' style={{ marginBottom: '5px' }}>
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
                            style={{ border: 'none', fontSize: '20px', fontWeight: '500' }}
                        />

                        <p className='show-mess'> {showValid && user.password === '' ? 'Vui lòng nhập mật khẩu.' : ''}</p>
                    </Form.Group>

                    {!loading ? (
                        <Button variant="primary" type="submit" className='btn-log-regis'>
                            Đăng nhập
                        </Button>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="loader-login"></div>
                        </div>
                    )}

                </Form>
                <Link className='d-flex justify-content-center align-items-center' style={{ color: 'black', fontSize: '19px' }}>Forgot password</Link>
            </div>
        </div>
    )
}

export default Login;
