import { useContext, useEffect, useState } from "react";
import APIs, { endpoints, BASE_URL } from "../../Configs/APIs";
import { Button } from "react-bootstrap";
import './Home.css'
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../../Configs/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
    const [specList, setSpecList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nameSpec, setNameSpec] = useState('');
    const [credit, setCredit] = useState('');
    const [nameTeach, setNameTeach] = useState('');
    const [idSub, setIdSub] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    // gọi API lấy dữ liệu
    const fetchSpec = async () => {
        setLoading(true);
        let url = `${BASE_URL}api/searchSpecifications/?nameSpec=${nameSpec}&subjectId=${idSub}&teacherName=${nameTeach}&credit=${credit}&page=${page}`;
        try {
            axios.get(url).then(response => {
                setSpecList(response.data);
            }).catch(error => { });
        } catch (error) {

        }
    };

    useEffect(() => {
        setLoading(false);
    }, [specList]);

    useEffect(() => {
        fetchSpec();
    }, []);

    const toSpecDetail = (s) => {
        navigate('/display-spec', { state: { spec: s } });
    };

    const showLog = () => {
        console.log(specList[0].author);
    };

    // hàm định dạng ngày
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <div className="mtop d-flex justify-content-center height-min">
            <div className="container-home">
                <div className="search-spec">
                    <FaSearch />
                    <input type="text" placeholder="Nhập tên đề cương để tìm kiếm" />
                    <h3 className="btn" style={{ marginRight: '0px' }} onClick={showLog}>search</h3>
                </div>

                {/* hiển thị các danh sách đề cương */}
                {loading === true ? (<div className="loader-spec"></div>) : (
                    <>
                        {specList === null ? (<>
                            <div className="d-flex justify-content-center">
                                <h2 style={{ color: 'gray' }}>Chưa có đề cương nào!</h2>
                            </div>
                        </>) : (<>
                            <div className="spec-container">
                                {specList.map(s => (
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

                            {/* page size */}
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">Trang trước</span>
                                            </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">Trang sau</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </>)}
                    </>
                )}

            </div>
        </div>
    );
};

export default Home;
