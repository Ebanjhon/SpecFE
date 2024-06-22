import React, { useContext, useEffect, useState } from 'react'
import './UserDetail.css';
import { UserContext } from '../../Configs/Contexts';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import APIs, { authApi, endpoints } from '../../Configs/APIs';
const UserDetail = () => {
    const [user, dispatch] = useContext(UserContext);
    const [state, setSate] = useState(false);
    const [file, setFile] = useState(null);
    const [messAlert, setMessAlert] = useState('');
    const [editUser, setEditUser] = useState(user);
    const [typeAlert, setTypeAlert] = useState('alert-info');
    const [showAlert, setShowAlert] = useState(false);
    const [stateProfile, setSateProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState({
        oldpass: "",
        newpass: "",
        confilmpass: ""
    });
    // thay doi trang thai sua pass
    const changStatePass = (i) => {
        setSate(i);
    };
    // show set profile
    const changStateProfile = (i) => {
        setSateProfile(i);
    };
    // hàm đổi pass
    const changePassword = (e) => {
        e.preventDefault();
    };
    // hàm chạy alert
    const showAlertMess = (e) => {
        switch (e) {
            case 1:
                // 201 tạo thành công
                setTypeAlert('alert-success');
                break;
            case 2:
                // 400 lỗi bad request
                setTypeAlert('alert-danger');
                break;
            case 3:
                // lỗi không trùng mật khẩu
                setTypeAlert('alert-warning');
                break;
            default:
            // code block
        }
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };
    // hàm định dạng ngày
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };
    // gọi api thay dôi pas
    const chagePass = async () => {
        if (password.newpass === '' || password.oldpass === '' || password.confilmpass === '') {
            setMessAlert('vui lòng nhập đầy đủ mật khẩu!');
            showAlertMess(2);
        }
        else if (password.newpass === password.confilmpass) {
            try {
                let formData = new FormData();
                formData.append("oldPassword", password.oldpass);
                formData.append("newPassword", password.newpass);
                formData.forEach((value, key) => {
                    console.log(key, value);
                });

                let response = await authApi().post(endpoints["change-pass"](user.idUser), formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    setMessAlert('Đổi mật khẩu thành công!');
                    showAlertMess(1);
                    changStatePass(false);
                    setPassword({
                        oldpass: "",
                        newpass: "",
                        confilmpass: ""
                    });
                }
            } catch (error) {
                if (error.response.status === 404) {
                    setMessAlert('Mật khẩu củ không khớp!');
                    showAlertMess(2);
                }
            }
        } else {
            setMessAlert('mật khẩu mới không khớp!');
            showAlertMess(3);
        }
    };
    // hàm lấy hinh ảnh và hiển thị hinh ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditUser({ ...editUser, avatar: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    // Hàm chuyển đổi ngày tháng thành định dạng dd-MM-yyyy
    const formatDateUpdate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // hàm thay dữ liệu user
    const updateUser = async () => {
        setLoading(true);
        let formData = new FormData();
        if (file !== null) {
            formData.append("file", file);
        }
        formData.append("firstName", editUser.firstname);
        formData.append("lastName", editUser.lastname);
        formData.append("address", editUser.address);
        formData.append("email", editUser.email);
        formData.append("phone", editUser.phone);
        formData.append("dateOfBirth", formatDateUpdate(editUser.dateOfBirth));
        formData.append("gender", editUser.gender);

        formData.forEach((value, key) => {
            console.log(key, value);
        });
        try {
            let response = await authApi().post(endpoints['update-user'](user.idUser), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const requestURL = response.request.responseURL;
            console.log('Request URL:', requestURL);
            if (response.status === 200) {
                setMessAlert('Cập nhật thông tin user thành công!');
                showAlertMess(1);

                setTimeout(async () => {
                    const u = await authApi().get(endpoints['current-user']);
                    sessionStorage.setItem('user', JSON.stringify(u.data));
                    dispatch({
                        "type": "login",
                        "payload": u.data
                    });
                    setLoading(false);
                }, 100);
            }
        } catch (error) {
            alert("Thất bại");
            console.error(error);
        }
    };

    useEffect(() => {
        setSateProfile(false);
    }, [user]);

    return (
        <div className='mtop parent-container height-min'>
            {showAlert === true &&
                <div className={`alert ${typeAlert} show-mess-infor`} role="alert">
                    {messAlert}
                </div>
            }
            <div className="container-home box-mg">
                <div className='container-profile'>
                    {stateProfile === true ? <>
                        <Form className='form-edit'>
                            <div className='set-file-avatar'>
                                <img src={editUser.avatar} alt='avata' />
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type='file'
                                        placeholder="Chọn ảnh"
                                        accept='image/png, image/jpeg, image/gif'
                                        onChange={handleFileChange}
                                        style={{ width: '200px' }}
                                    />
                                </InputGroup>
                                <Form.Group>
                                    <Form.Label>UserName</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        <Form.Control
                                            value={editUser.username}
                                            placeholder="Username"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>
                            <div className='form-input-profile'>
                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Firstname" value={editUser.firstname} onChange={(e) => setEditUser({ ...editUser, firstname: e.target.value })} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Lastname" value={editUser.lastname} onChange={(e) => setEditUser({ ...editUser, lastname: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Address" value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Number phone</Form.Label>
                                    <Form.Control type="Number" placeholder="Enter number phone" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
                                </Form.Group>

                                <div className='form-date-gender'>
                                    <div className="DatePickerContainer">
                                        <Form.Label>Date of birth</Form.Label>
                                        <DatePicker
                                            selected={editUser.dateOfBirth}
                                            // onChange={(date) => setStartDate(date)}
                                            onChange={(date) => setEditUser({ ...editUser, dateOfBirth: date })}
                                            className="DatePickerInput" // Assign className for DatePicker input field
                                            calendarClassName="DatePickerPopover" // Assign className for calendar popover
                                            classNamePrefix="DatePicker" // Assign prefix for classNames inside DatePicker
                                        />

                                        <Form.Label className='mt-3'>Date of birth</Form.Label>
                                        <Form.Select aria-label="Default select example" value={editUser.gender} onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        {loading === true ? <>
                            <div className="loader-update-user"></div>
                        </> : <>
                            <Button variant="danger" onClick={() => changStateProfile(false)} className='btn-cancel'>Hủy</Button>
                            <Button variant="warning" onClick={updateUser} className='btn-edit'>Cập nhật</Button>
                        </>}
                    </> : <>
                        <div className='backgroud-image'><img src='/images/bg.jpg' alt='anhr bia' fetchpriority="auto" loading="auto" /></div>
                        <div className='avatar-image'>{user.avatar !== null ? <><img src={user.avatar} alt='hinh' /></> : <><h2>avatar</h2></>}</div>
                        <div className='profile-top'><p style={{ fontStyle: 'italic' }}>({user.role})🐼</p><h4>{user.username}</h4></div>
                        <table className='table-infor'>
                            <tr>
                                <th>Họ và tên:</th>
                                <td>{user.firstname} {user.lastname}</td>
                            </tr>
                            <tr>
                                <th>Ngày sinh:</th>
                                <td>{formatDate(user.dateOfBirth)}</td>
                            </tr>
                            <tr>
                                <th>Giới tính:</th>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Địa chỉ:</th>
                                <td>{user.address}</td>
                            </tr>
                            <tr>
                                <th>Số điện thoại:</th>
                                <td>{user.phone}</td>
                            </tr>
                        </table>
                        {state === false && <Button className='set-chager' variant="secondary" onClick={() => changStateProfile(true)}>Chỉnh sửa thông tin người dùng</Button>}
                        {state === true ? <>
                            <div className='change-pass'>
                                <Form onSubmit={changePassword}>
                                    <Form.Group className="" controlId="formBasicPassword">
                                        <Form.Label>Nhập mật khẩu cũ</Form.Label>
                                        <Form.Control type="password"
                                            placeholder="Old Password"
                                            onChange={(e) => setPassword({ ...password, oldpass: e.target.value })}
                                            value={password.oldpass} />
                                    </Form.Group>

                                    <Form.Group className="" controlId="formBasicPassword">
                                        <Form.Label>Nhập mật khẩu mởi</Form.Label>
                                        <Form.Control type="password"
                                            placeholder="New Password"
                                            onChange={(e) => setPassword({ ...password, newpass: e.target.value })}
                                            value={password.newpass} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Nhập lại mật khẩu mởi</Form.Label>
                                        <Form.Control type="password"
                                            placeholder="Password Again"
                                            onChange={(e) => setPassword({ ...password, confilmpass: e.target.value })}
                                            value={password.confilmpass} />
                                    </Form.Group>
                                    <div className='btn-chage-pass'>
                                        {/* <Button type='submit' >Hiển thị mật khẩu</Button> */}
                                        <Button variant="success" type='submit' onClick={chagePass}>Thay đôi mật khẩu</Button>
                                        <Button variant="danger" type='button' onClick={() => changStatePass(false)}>Hủy thay đôi</Button>
                                    </div>
                                </Form>
                            </div>
                        </> : <>
                            <Button className='btn-pass' onClick={() => changStatePass(true)}>Cập nhật mật khẩu</Button>
                        </>}
                    </>}
                </div>
            </div>
        </div>
    )
}

export default UserDetail
