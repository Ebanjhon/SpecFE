import { useContext, useEffect, useState } from "react";
import APIs, { endpoints, BASE_URL, authApi } from "../../Configs/APIs";
import { Button, Table } from "react-bootstrap";
import { UserContext } from "../../Configs/Contexts";
import { useNavigate } from "react-router-dom";
import './MySpec.css'
const MySpec = () => {
    const [user, dispatch] = useContext(UserContext);
    const [specList, setSpecList] = useState(null);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    // gọi API lấy dữ liệu
    const fetchSpec = async () => {
        let url = `${BASE_URL}api/searchSpecifications/?authorID=${user.idUser}`;
        try {
            authApi().get(url).then(response => {
                setSpecList(response.data);
            }).catch(error => {
                if (error.response && error.response.status === 404) {
                    // setLoading(false);
                    setSpecList(null);
                } else {
                    console.error('An error occurred:', error);
                }
            });
        } catch (error) {
        }
    };
    // get spec user oder
    const getSpecByUserOder = async () => {
        try {
            let response = await authApi().get(endpoints['get-spec-user-oder'](user.idUser));
            setSpecList(response.data);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        if (user.role === 'ROLE_TEACHER') {
            fetchSpec();
        } else {
            getSpecByUserOder();
        }
    }, [])


    // hàm định dạng ngày
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    // show hàm alert
    const deleteSpec = (id) => {
        setAlert(true);
        setIdDelete(id);
    };

    const [idDelete, setIdDelete] = useState();
    const fetDeleteSpec = async () => {
        try {
            let response = await authApi().delete(endpoints['delete-spec'](idDelete));
        } catch (error) {
            console.error(error);
        } finally {
            setAlert(false);
            fetchSpec();
        }
    };

    // đến trang chỉnh sửa
    const editSpec = (s) => {
        navigate('/spec-editer', { state: { spec: s } });
    };

    return (
        <div className="mtop d-flex justify-content-center height-min">
            {alert === true && <>
                <div className="alert-delete">
                    <div className="box-ask">
                        <p>Bạn có chắc chắn muốn xóa đề cương này không?</p>
                        <div className="btn-cancel-ok">
                            <button className="btn btn-outline-success" onClick={() => setAlert(false)}>Cancel</button>
                            <button className="btn btn-outline-danger" onClick={fetDeleteSpec}>Delete</button>
                        </div>
                    </div>
                </div>
            </>}
            <div className="container-home" style={{ width: '86%' }}>
                <h2>Danh sách các đề cương của bạn</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Mã Đề</th>
                            <th>Họ tên tác giả</th>
                            <th>Tên đề cương</th>
                            <th>Môn học</th>
                            <th>Ngày đăng tải</th>
                            <th>Tín chỉ</th>
                            <th>Loại đề</th>
                            <th>Trạng thái</th>
                            <th>Xem chi tiết</th>

                            {user.role === 'ROLE_TEACHER' && <th>Chỉnh sửa</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {specList !== null && <>
                            {specList.results.map(s => (
                                <tr>
                                    <td>{s.idSpec}</td>
                                    <td>{s.author.firstname} {s.author.lastname}</td>
                                    <td>{s.nameSpec}</td>
                                    <td>{s.subject.nameSubject}</td>
                                    <td>{formatDate(s.dateCreate)}</td>
                                    <td>{s.credit}</td>
                                    <td>{s.typeofspecifi.nameType}</td>
                                    <td>{s.status}</td>
                                    <td className=""> <Button variant="secondary">Dowload</Button>{' '}</td>
                                    {user.role === 'ROLE_TEACHER' &&
                                        <td className="d-flex justify-content-around">
                                            {/* <Button variant="warning" onClick={() => editSpec(s)}>Edit</Button>{' '} */}
                                            <Button variant="danger" onClick={() => deleteSpec(s.idSpec)}>Delete</Button>{' '}
                                        </td>
                                    }
                                </tr>
                            ))}
                        </>}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MySpec
