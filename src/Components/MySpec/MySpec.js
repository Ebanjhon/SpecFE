import { useContext, useEffect, useReducer, useState } from "react";
import APIs, { endpoints, BASE_URL, authApi } from "../../Configs/APIs";
import { Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../../Configs/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MySpec = () => {
    // const [specList, setSpecList] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [nameSpec, setNameSpec] = useState('');
    // const [credit, setCredit] = useState('');
    // const [nameTeach, setNameTeach] = useState('');
    // const [idSub, setIdSub] = useState('');
    // const navigate = useNavigate();
    // const [pageSize, setPageSize] = useState(0);
    // const [supjects, setSupjects] = useState(null);


    return (
        <div className="mtop d-flex justify-content-center height-min">
            <div className="container-home">

                {/* hiển thị các danh sách đề cương
                {loading === true ? (<div className="loader-spec"></div>) : (
                    <>
                        {specList === null ? (<>
                            <div className="d-flex justify-content-center">
                                <h2 style={{ color: 'gray' }}>Không tìm thấy đề cương nào!</h2>
                            </div>
                        </>) : (<>
                            <div className="spec-container">
                                {specList.results.map(s => (
                                    <div className="item-spec">
                                        <img src={s.author.avatar} />
                                        <div style={{ width: '20%' }}>
                                            <h5>{s.author.firstname} {s.author.lastname}</h5>
                                            <p>{s.author.email}</p>
                                            <p>Mã GV: {s.author.idUser}</p>
                                            <p>Username: {s.author.username}</p>
                                        </div>
                                        <div style={{ width: '19%' }}>
                                            <h6>Mã đề cương: {s.idSpec}</h6>
                                            <h6>Tên Đề cương</h6>
                                            <p>{s.nameSpec}</p>
                                            <h6>Môn học</h6>
                                            <p>{s.subject.nameSubject}</p>
                                        </div>
                                        <div style={{ width: '15%' }}>
                                            <h6>Ngày tạo</h6>
                                            <p>{formatDate(s.dateCreate)}</p>
                                            <h6>Đề cương dạng</h6>
                                            <p>{s.typeofspecifi.nameType}</p>
                                        </div>
                                        <Button onClick={() => toSpecDetail(s)}>Xem chi tiết đề cương</Button>
                                    </div>
                                ))}

                            </div>
                        </>)}
                    </>
                )} */}
            </div>
        </div>
    )
}

export default MySpec
