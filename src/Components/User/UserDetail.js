import React, { useContext, useState } from 'react'
import './UserDetail.css';
import { UserContext } from '../../Configs/Contexts';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const UserDetail = () => {
    const [user, dispatch] = useContext(UserContext);
    const [state, setSate] = useState(false);
    const [file, setFile] = useState();
    const [stateProfile, setSateProfile] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
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
        console.log('ok');
    };

    return (
        <div className='mtop parent-container height-min'>
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
                                        <Form.Control type="password" placeholder="Old Password" />
                                    </Form.Group>

                                    <Form.Group className="" controlId="formBasicPassword">
                                        <Form.Label>Nhập mật khẩu mởi</Form.Label>
                                        <Form.Control type="password" placeholder="New Password" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Nhập lại mật khẩu mởi</Form.Label>
                                        <Form.Control type="password" placeholder="Password Again" />
                                    </Form.Group>
                                    <div className='btn-chage-pass'>
                                        <Button variant="success" type='submit'>Thay đôi mật khẩu</Button>
                                        <Button variant="danger" type='button' onClick={() => changStatePass(false)}>Thay đôi mật khẩu</Button>
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
