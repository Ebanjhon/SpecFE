import React, { useContext, useState } from 'react'
import './UserDetail.css';
import { UserContext } from '../../Configs/Contexts';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import axios, { authApi, endpoints } from '../../Configs/APIs';
import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

const UserDetail = () => {
    const [user, dispatch] = useContext(UserContext);
    const [state, setSate] = useState(false);
    const [file, setFile] = useState(null);
    const [stateProfile, setSateProfile] = useState(false);
    const [startDate, setStartDate] = useState(new Date(user.dateOfBirth));
    const [updatedUser, setUpdatedUser] = useState({
        firstName: user.firstname || '',
        lastName: user.lastname || '',
        address: user.address || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
        gender: user.gender || 'Nam'
    });

    const changStatePass = (i) => {
        setSate(i);
    };

    const changStateProfile = (i) => {
        setSateProfile(i);
    };

    const changePassword = (e) => {
        e.preventDefault();
        console.log('ok');
    };

    const handleInputChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setUpdatedUser({
            ...updatedUser,
            dateOfBirth: date
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log('handleUpdateProfile called');
        const formData = new FormData();
        for (const key in updatedUser) {
            if (key === 'dateOfBirth') {
                const date = new Date(updatedUser[key]);
                if (!isNaN(date)) {
                    formData.append(key, format(date, 'dd-MM-yyyy'));
                } else {
                    console.error("Invalid date:", updatedUser[key]);
                }
            } else {
                formData.append(key, updatedUser[key] || '');
            }
        }
        if (file) {
            formData.append('file', file);
        }

        // Xuất dữ liệu để kiểm tra
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await authApi().post(endpoints['update-user'](user.idUser), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('Response data:', response.data);
                alert('User updated successfully');
                dispatch({ type: 'UPDATE_USER', payload: response.data });
                setSateProfile(false);
            } else {
                console.error('Failed to update user', response);
            }
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };
    return (
        <div className='mtop parent-container height-min'>
            <div className="container-home box-mg">
                <div className='container-profile'>
                    {stateProfile ? (
                        <>
                            <Form className='form-edit' onSubmit={handleUpdateProfile}>
                                <div className='set-file-avatar'>
                                    <img src={user.avatar} alt='avatar' />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type='file'
                                            placeholder="Chọn ảnh"
                                            accept='image/*'
                                            style={{ width: '200px' }}
                                            onChange={handleFileChange}
                                        />
                                    </InputGroup>
                                </div>
                                <div className='form-input-profile'>
                                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            name="firstName"
                                            type="text"
                                            placeholder="Enter Firstname"
                                            value={updatedUser.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            name="lastName"
                                            type="text"
                                            placeholder="Enter Lastname"
                                            value={updatedUser.lastName}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            placeholder="Enter email"
                                            value={updatedUser.email}
                                            onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            name="address"
                                            type="text"
                                            placeholder="Enter Address"
                                            value={updatedUser.address}
                                            onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                        <Form.Label>Number phone</Form.Label>
                                        <Form.Control
                                            name="phone"
                                            type="text"
                                            placeholder="Enter number phone"
                                            value={updatedUser.phone}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                    <div className='form-date-gender'>
                                        <div className="DatePickerContainer">
                                            <Form.Label>Date of birth</Form.Label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleDateChange}
                                                className="DatePickerInput"
                                                calendarClassName="DatePickerPopover"
                                                classNamePrefix="DatePicker"
                                            />
                                            <Form.Label className='mt-3'>Gender</Form.Label>
                                            <Form.Select
                                                name="gender"
                                                value={updatedUser.gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="danger" onClick={() => setSateProfile(false)} className='btn-cancel'>Hủy</Button>
                                <Button variant="warning" type="submit" className='btn-edit'>Cập nhật</Button>
                            </Form>
                        </>
                    ) : (
                        <>
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
                            {state === true ? (
                                <>
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
                                </>
                            ) : (
                                <Button className='btn-pass' onClick={() => changStatePass(true)}>Cập nhật mật khẩu</Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
