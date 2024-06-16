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
import { UserContext } from "../../Configs/Contexts";
import APIs, { authApi, endpoints } from "../../Configs/APIs";

const Register = () => {
    const [showValid, setShowValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dispatch] = useContext(UserContext); // Xóa userCurrent vì không được sử dụng
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        gender: "",
        role: "",
    });
    const [file, setFile] = useState(null);

    // hàm cập nhật nội dung
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // hàm gọi đăng ký
    const register = async (e) => {
        e.preventDefault();
        if (Object.values(user).some((field) => field === "") || !file) {
            setShowValid(true);
        } else {
            setLoading(true);
            try {
                let formData = new FormData();
                for (let key in user) {
                    formData.append(key, user[key]);
                }

                formData.append("file", file); // Thêm tập tin vào FormData
                console.log(formData.get('file'));
                // // Kiểm tra dữ liệu gửi đi
                // for (let pair of formData.entries()) {
                //     console.log(pair[0] + ': ' + pair[1]);
                // }

                let response = await APIs.post(endpoints["register"], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                cookie.save("token", response.data);

                setTimeout(async () => {
                    alert("Đăng kí thành công! Check mail để xem thông tin chi tiết ");
                }, 100);
            } catch (error) {
                console.error("Đăng ký thất bại:", error);
                if (error.code === "ERR_NETWORK") {
                    alert("Lỗi server!");
                } else {
                    setShowValid(true);
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
                <div
                    className="alert alert-danger"
                    style={{ minWidth: "470px" }}
                    role="alert"
                >
                    Vui lòng điền đầy đủ thông tin!
                </div>
            )}
            <div className="regist-form">
                <h1
                    className="d-flex justify-content-center align-items-center"
                    style={{ fontSize: "50px", marginBottom: "20px" }}
                >
                    Đăng Kí
                </h1>
                <Form onSubmit={register}>
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
                    <Form.Group controlId="formAvatar" className="label-input">
                        <Form.Label className="label">Ảnh đại diện</Form.Label>
                        <Form.Control
                            className="input-regist"
                            type="file"
                            name="avatar"
                            onChange={handleFileChange} // Thêm hàm xử lý tập tin
                        />
                    </Form.Group>

                    {!loading ? (
                        <Button variant="primary" type="submit" className="btn-log-regis">
                            Đăng ký
                        </Button>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary"></div>
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
        </div>
    );
};

export default Register;