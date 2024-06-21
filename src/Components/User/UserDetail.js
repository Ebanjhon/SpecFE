import React, { useContext, useState } from 'react'
import './UserDetail.css';
import { UserContext } from '../../Configs/Contexts';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { authApi, endpoints } from '../../Configs/APIs';
const UserDetail = () => {
    const [user, dispatch] = useContext(UserContext);
    const [state, setSate] = useState(false);
    const [file, setFile] = useState();
    const [messAlert, setMessAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('alert-info');
    const [showAlert, setShowAlert] = useState(false);
    const [stateProfile, setSateProfile] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
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
                                <img src='https://i.pinimg.com/originals/89/1c/e8/891ce88cac43afadd7da91fb409a4cb3.jpg' alt='avata' />
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type='file'
                                        placeholder="Chọn ảnh"
                                        accept='image'
                                        style={{ width: '200px' }}
                                    />
                                </InputGroup>
                                <Form.Group>
                                    <Form.Label className='text-lable'>Nhập tên người dùng</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        <Form.Control
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
                                    <Form.Control type="text" placeholder="Enter Firstname" />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Lastname" />
                                </Form.Group>
                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Address" />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                    <Form.Label>Number phone</Form.Label>
                                    <Form.Control type="Number" placeholder="Enter number phone" />
                                </Form.Group>
                                <div className='form-date-gender'>
                                    <div className="DatePickerContainer">
                                        <Form.Label>Date of birth</Form.Label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="DatePickerInput" // Assign className for DatePicker input field
                                            calendarClassName="DatePickerPopover" // Assign className for calendar popover
                                            classNamePrefix="DatePicker" // Assign prefix for classNames inside DatePicker
                                        />
                                        <Form.Label className='mt-3'>Date of birth</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <Button variant="danger" onClick={() => changStateProfile(false)} className='btn-cancel'>Hủy</Button>
                        <Button variant="warning" onClick={() => changStateProfile(false)} className='btn-edit'>Cập nhật</Button>
                    </> : <>
                        <div className='backgroud-image'><img src='/images/bg.jpg' alt='anhr bia' /></div>
                        <div className='avatar-image'><img src={user.avatar} alt='hinh' /></div>
                        <div className='profile-top'><p style={{ fontStyle: 'italic' }}>({user.role})🐼</p><h4>{user.username}</h4></div>
                        <table className='table-infor'>
                            <tr>
                                <th>Họ và tên:</th>
                                <td>{user.firstname} {user.lastname}</td>
                            </tr>
                            <tr>
                                <th>Ngày sinh:</th>
                                <td>{user.dateOfBirth}</td>
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
