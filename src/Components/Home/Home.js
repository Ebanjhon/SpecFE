import { useEffect, useReducer, useState } from "react";
import APIs, { endpoints, BASE_URL, authApi } from "../../Configs/APIs";
import { Button, Form } from "react-bootstrap";
import './Home.css'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    // reducer phân trang
    const PageReducer = (page, action) => {
        switch (action.type) {
            case "next": {
                return page + 1;
            }
            case "num": {
                return (action.payload + 1);
            }
            case "nom": {
                return (action.payload - 1);
            }
            case "back": {
                return page - 1;
            }
        }
        return page;
    }
    const [specList, setSpecList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nameSpec, setNameSpec] = useState('');
    const [credit, setCredit] = useState('');
    const [nameTeach, setNameTeach] = useState('');
    const [idSub, setIdSub] = useState('');
    const [page, dispatch] = useReducer(PageReducer, 1);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(0);
    const [supjects, setSupjects] = useState(null);

    // gọi API lấy dữ liệu
    const fetchSpec = async () => {
        setLoading(true);
        let url = `${BASE_URL}api/searchSpecifications/?nameSpec=${nameSpec}&subjectId=${idSub}&teacherName=${nameTeach}&credit=${credit}&page=${page}`;
        try {
            authApi().get(url).then(response => {
                setSpecList(response.data);
                setPageSize(Math.ceil(response.data.totalCount / 5));
            }).catch(error => {
                if (error.response && error.response.status === 404) {
                    setLoading(false);
                    setSpecList(null);
                } else {
                    console.error('An error occurred:', error);
                }
            });
        } catch (error) {
            setLoading(false);
        }
    };
    // api lấy dữ liệu môn học
    const subjects = async () => {
        try {
            let response = await authApi().get(endpoints['subjects']);
            setSupjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    // Hàm thay đổi biểu tượng Dialogflow
    const changeIcon = () => {
        const interval = setInterval(() => {
            const dfMessenger = document.querySelector("df-messenger");
            if (dfMessenger) {
                const shadowRoot = dfMessenger.shadowRoot;
                if (shadowRoot) {
                    const chatIcon = shadowRoot.querySelector(".df-chat-icon");
                    if (chatIcon) {
                        chatIcon.style.background = "url('/public/images/10141610.jpg') no-repeat center center";
                        chatIcon.style.backgroundSize = "contain";
                        clearInterval(interval);
                    }
                }
            }
        }, 1000);
    };


    useEffect(() => {
        subjects();
        changeIcon();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [specList]);

    useEffect(() => {
        fetchSpec();
    }, [page, nameTeach, nameSpec, credit, idSub]);

    const toSpecDetail = (s) => {
        navigate('/display-spec', { state: { spec: s } });
    };

    const showLog = () => {
        setCredit('');
        setNameSpec('');
        setNameTeach('');
        setIdSub('');
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
                    <input type="text" placeholder="Nhập tên đề cương để tìm kiếm" value={nameSpec} onChange={e => setNameSpec(e.target.value)} />
                    <h3 className="btn" style={{ marginRight: '0px' }} onClick={showLog}>Clean</h3>
                </div>
                <Form className="d-flex">
                    <Form.Group className="mt-3 col-6" controlId="exampleForm.ControlInput1">
                        <Form.Label className="mb-0">Tên Giảng viên biên soạn</Form.Label>
                        <Form.Control type="text" placeholder="Tên người dùng tác giả" style={{ height: '50px' }} value={nameTeach} onChange={e => setNameTeach(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="col-2 mt-3">
                        <Form.Label className="mb-0">Số tín chỉ</Form.Label>
                        <Form.Select aria-label="Default select example" style={{ height: '50px' }} value={credit} onChange={e => setCredit(e.target.value)}>
                            <option value="">Mặc định</option>
                            <option value="2">Môn học 2 tín chỉ</option>
                            <option value="3">Môn học 3 tín chỉ</option>
                            <option value="4">Môn học 4 tín chỉ</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="col-2 mt-3">
                        <Form.Label className="mb-0">Môn học</Form.Label>
                        <Form.Select aria-label="Default select example" style={{ height: '50px' }} value={idSub} onChange={e => setIdSub(e.target.value)}>
                            <option value="">Mặc định</option>
                            {supjects !== null && <>
                                {supjects.map(s => (
                                    <option value={s.idSubject}>{s.nameSubject}</option>
                                ))}
                            </>}
                        </Form.Select>
                    </Form.Group>
                </Form>

                {/* hiển thị các danh sách đề cương */}
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

                            {/* page size */}
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination" style={{ cursor: 'pointer' }}>
                                        {page !== 1 ? <>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true" onClick={() => dispatch({ type: 'back' })}>Trang trước</span>
                                                </a>
                                            </li>
                                            <li className="page-item"><a className="page-link" onClick={() => dispatch({ type: 'nom', payload: page })}>{page - 1}</a></li>
                                        </> : <>
                                            <li className="page-item">
                                                <a className="page-link" aria-label="Previous" style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <span aria-hidden="true">Trang  trước</span>
                                                </a>
                                            </li>
                                        </>}
                                        <li className="page-item"><a className="page-link" style={{ backgroundColor: '#D6E9F1' }}>{page}</a></li>
                                        {page !== pageSize ? <>
                                            <li className="page-item"><a className="page-link" onClick={() => dispatch({ type: 'num', payload: page })}>{page + 1}</a></li>
                                            <li className="page-item">
                                                <a className="page-link" aria-label="Next">
                                                    <span aria-hidden="true" onClick={() => dispatch({ type: 'next' })}>Trang sau</span>
                                                </a>
                                            </li>
                                        </> : <>
                                            <li className="page-item" >
                                                <a className="page-link" aria-label="Next" style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <span aria-hidden="true" >Trang sau</span>
                                                </a>
                                            </li>
                                        </>}

                                    </ul>
                                </nav>
                            </div>

                        </>)}
                    </>
                )}


                <df-messenger
                    chat-icon="https://res.cloudinary.com/daimrgwuu/image/upload/v1719025996/icon_ai_vj99jf.png"
                    intent="WELCOME"
                    chat-title="AI_SPEC"
                    agent-id="c599d7c1-b4b2-4f55-8467-a8f1e36ad465"
                    language-code="vi"
                ></df-messenger>


            </div>
        </div>
    );
};

export default Home;
