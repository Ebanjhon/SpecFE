import { Button, Form } from "react-bootstrap";
import "./Register.css";
import cookie from "react-cookies";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaUnlock,
    FaLock,
    FaUser,
    FaEnvelope,
    FaTransgender,
} from "react-icons/fa";
import { MdOutlineSettingsAccessibility } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import APIs, { authApi, endpoints } from "../../Configs/APIs";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [showValid, setShowValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [messError, setMessError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        gender: "",
        role: "",
    });

    // hàm cập nhật nội dung
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const [file, setFile] = useState(null);
    const [previewAVT, setPreviewAVT] = useState(null);
    // hay lấy hinh ảnh
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreviewAVT(URL.createObjectURL(selectedFile));
    };

    // hàm gọi đăng ký
    const register = async (e) => {
        e.preventDefault();
        if (Object.values(user).some((field) => field === "") || !file) {
            setMessError('Vui lòng nhập đầy đủ thông tin!')
            setShowValid(true);
        } else if (user.password !== confirmPass) {
            setMessError('Mật khẩu bạn nhập không khớp!')
            setShowValid(true);
        } else {
            setLoading(true);
            try {
                let formData = new FormData();
                for (let key in user) {
                    formData.append(key, user[key]);
                }

                formData.append("file", file); // Thêm tập tin vào FormData
                // console.log(formData.get('file'));
                // // Kiểm tra dữ liệu gửi đi

                // formData.forEach((value, key) => {
                //     console.log(key, value);
                // });

                let response = await APIs.post(endpoints["register"], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(response.data);
                setTimeout(async () => {
                    alert("Đăng kí thành công! Check mail để xem thông tin chi tiết ");
                    navigate('/login');
                }, 100);
            } catch (error) {
                console.error("Đăng ký thất bại:", error);
                if (error.response) {
                    if (error.response.status === 400) {
                        setShowValid(true);
                        setMessError(error.response.data);
                    } else if (error.code === "ERR_NETWORK") {
                        alert("Lỗi server!");
                    } else {
                        setShowValid(true);
                        setMessError('Đăng ký thất bại');
                    }
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="background-regist d-flex justify-content-center align-items-center .chieucao-from-regist">
            {showValid && (
                <div className="alert alert-danger" style={{ minWidth: '550px' }} role="alert">
                    {messError}
                </div>
            )}
            <div className="regist-form">
                <h1
                    className="d-flex justify-content-center align-items-center"
                    style={{ fontSize: "50px", marginBottom: "20px", fontFamily: "Bungee, sans-serif" }}
                >
                    Đăng Ký
                </h1>
                <Form onSubmit={register}>

                    <Form.Group controlId="formUsername" className="label-input">
                        <FaUser className="icon-regist" />
                        <Form.Label className="label">Tên đăng nhập</Form.Label>
                        <Form.Control
                            className="input-regist"
                            type="text"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="firt-last-name">
                        <Form.Group controlId="formFirstName" className="label-input">
                            <FaAddressBook className="icon-regist" />
                            <Form.Label className="label">Tên</Form.Label>
                            <Form.Control
                                className="input-regist"
                                type="text"
                                name="firstName"
                                placeholder="Nhập tên của bạn"
                                value={user.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName" className="label-input">
                            <FaAddressBook className="icon-regist" />
                            <Form.Label className="label">Họ</Form.Label>
                            <Form.Control
                                className="input-regist"
                                type="text"
                                name="lastName"
                                placeholder="Nhập họ của bạn"
                                value={user.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <Form.Group controlId="formEmail" className="label-input">
                        <FaEnvelope className="icon-regist" />
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control
                            className="input-regist"
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="firt-last-name" style={{ justifyContent: 'space-between' }}>
                        <Form.Group controlId="formGender" className="label-input">
                            <FaTransgender className="icon-regist" />
                            <Form.Label className="label">Giới tính</Form.Label>
                            <Form.Select
                                className="input-regist"
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formRole" className="label-input">
                            <MdOutlineSettingsAccessibility className="icon-regist" />
                            <Form.Label className="label">Vai trò</Form.Label>
                            <Form.Select
                                className="input-regist"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value="">Chọn vai trò</option>
                                <option value="ROLE_TEACHER">Giảng viên </option>
                                <option value="ROLE_STUDENT">Sinh viên</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="show-img">
                            {file !== null ?
                                <img src={previewAVT} alt="Preview" />
                                : <>
                                    avatar
                                </>}
                        </div>
                    </div>

                    <Form.Group controlId="formAvatar" className="label-input">
                        <Form.Label className="label">Ảnh đại diện</Form.Label>
                        <Form.Control
                            className="input-regist"
                            type="file"
                            name="avatar"
                            accept='image/png, image/jpeg'
                            onChange={handleFileChange} // Thêm hàm xử lý tập tin
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="label-input">
                        <span
                            className="password-toggle eye"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FaUnlock className="icon-regist" />
                            ) : (
                                <FaLock className="icon-regist" />
                            )}
                        </span>
                        <Form.Label className="label">Mật khẩu</Form.Label>
                        <Form.Control
                            className="input-regist"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={user.password}
                            onChange={handleChange}
                            autoFocus={false}
                            style={{ border: "none" }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPasswordConfirm" className="label-input">
                        <span
                            className="password-toggle eye"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FaUnlock className="icon-regist" />
                            ) : (
                                <FaLock className="icon-regist" />
                            )}
                        </span>
                        <Form.Label className="label">Xác nhậ mật khẩu</Form.Label>
                        <Form.Control
                            className="input-regist"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPass}
                            onChange={e => setConfirmPass(e.target.value)}
                            autoFocus={false}
                            style={{ border: "none" }}
                        />
                    </Form.Group>

                    {!loading ? (
                        <Button variant="info" type="submit" className="btn-log-regis">
                            Đăng ký
                        </Button>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="loader-register"></div>
                        </div>
                    )}
                </Form>
                <Link

                    to="/login"
                    className="d-flex justify-content-center align-items-center"
                    style={{ color: "black", fontSize: "19px" }}
                >
                    Bạn đã có tài khoản?{" "}
                </Link>
            </div>
        </div >
    );
};

export default Register;