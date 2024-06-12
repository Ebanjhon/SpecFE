import { useContext, useEffect, useState } from "react";
import APIs, { endpoints } from "../../Configs/APIs";
import { Button } from "react-bootstrap";
import './Home.css'
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../../Configs/Contexts";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const [subjects, setSubjects] = useState(null);
    const [user, dispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const fetchSubjects = async () => {
        try {
            let response = await APIs.get(endpoints['subjects']);
            setSubjects(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSubjects();
    }, []);

    const toSpecDetail = () => {
        navigate('/display-spec');
    };

    const showLog = () => {
        console.log(user);
    };

    return (
        <div className="mtop d-flex justify-content-center height-min">
            <div className="container-home">
                <div className="search-spec">
                    <FaSearch />
                    <input type="text" />
                    <h3 className="btn" style={{ marginRight: '0px' }} onClick={showLog}>search</h3>
                </div>

                {/* hiển thị các danh sách đề cương */}
                <div className="spec-container">
                    <div className="item-spec">
                        <img src="https://i.pinimg.com/originals/12/5d/13/125d13ca5f1aec0b4a5b7fa23b3be870.jpg" />
                        <div>
                            <h5>Nguyễn văn Mau</h5>
                            <p>nvmau123@gmail.com</p>
                            <p>Mã GV: 098721</p>
                            <p>SDT: 0887582342</p>
                        </div>
                        <div>
                            <h6>Mã đề cương: 02131</h6>
                            <h6>Tên Đề cương</h6>
                            <p>Đề cương môn Lập trình web</p>
                            <h6>Môn học</h6>
                            <p>Thiết kế web</p>
                        </div>
                        <div>
                            <h6>Ngày tạo</h6>
                            <p>13-06-2024</p>
                            <h6>Đề cương dạng</h6>
                            <p>File Word</p>
                        </div>
                        <Button onClick={toSpecDetail}>Xem chi tiết đề cương</Button>
                    </div>

                    <div className="item-spec">
                        <img src="https://i.pinimg.com/originals/12/5d/13/125d13ca5f1aec0b4a5b7fa23b3be870.jpg" />
                        <div>
                            <h5>Nguyễn văn Mau</h5>
                            <p>nvmau123@gmail.com</p>
                            <p>Mã GV: 098721</p>
                            <p>SDT: 0887582342</p>
                        </div>
                        <div>
                            <h6>Mã đề cương: 02131</h6>
                            <h6>Tên Đề cương</h6>
                            <p>Đề cương môn Lập trình web</p>
                            <h6>Môn học</h6>
                            <p>Thiết kế web</p>
                        </div>
                        <div>
                            <h6>Ngày tạo</h6>
                            <p>13-06-2024</p>
                            <h6>Đề cương dạng</h6>
                            <p>File Word</p>
                        </div>
                        <Button>Xem chi tiết đề cương</Button>
                    </div>

                    <div className="item-spec">
                        <img src="https://i.pinimg.com/originals/12/5d/13/125d13ca5f1aec0b4a5b7fa23b3be870.jpg" />
                        <div>
                            <h5>Nguyễn văn Mau</h5>
                            <p>nvmau123@gmail.com</p>
                            <p>Mã GV: 098721</p>
                            <p>SDT: 0887582342</p>
                        </div>
                        <div>
                            <h6>Mã đề cương: 02131</h6>
                            <h6>Tên Đề cương</h6>
                            <p>Đề cương môn Lập trình web</p>
                            <h6>Môn học</h6>
                            <p>Thiết kế web</p>
                        </div>
                        <div>
                            <h6>Ngày tạo</h6>
                            <p>13-06-2024</p>
                            <h6>Đề cương dạng</h6>
                            <p>File Word</p>
                        </div>
                        <Button>Xem chi tiết đề cương</Button>
                    </div>

                    <div className="item-spec">
                        <img src="https://i.pinimg.com/originals/12/5d/13/125d13ca5f1aec0b4a5b7fa23b3be870.jpg" />
                        <div>
                            <h5>Nguyễn văn Mau</h5>
                            <p>nvmau123@gmail.com</p>
                            <p>Mã GV: 098721</p>
                            <p>SDT: 0887582342</p>
                        </div>
                        <div>
                            <h6>Mã đề cương: 02131</h6>
                            <h6>Tên Đề cương</h6>
                            <p>Đề cương môn Lập trình web</p>
                            <h6>Môn học</h6>
                            <p>Thiết kế web</p>
                        </div>
                        <div>
                            <h6>Ngày tạo</h6>
                            <p>13-06-2024</p>
                            <h6>Đề cương dạng</h6>
                            <p>File Word</p>
                        </div>
                        <Button>Xem chi tiết đề cương</Button>
                    </div>
                    <div className="item-spec">
                        <img src="https://i.pinimg.com/originals/12/5d/13/125d13ca5f1aec0b4a5b7fa23b3be870.jpg" />
                        <div>
                            <h5>Nguyễn văn Mau</h5>
                            <p>nvmau123@gmail.com</p>
                            <p>Mã GV: 098721</p>
                            <p>SDT: 0887582342</p>
                        </div>
                        <div>
                            <h6>Mã đề cương: 02131</h6>
                            <h6>Tên Đề cương</h6>
                            <p>Đề cương môn Lập trình web</p>
                            <h6>Môn học</h6>
                            <p>Thiết kế web</p>
                        </div>
                        <div>
                            <h6>Ngày tạo</h6>
                            <p>13-06-2024</p>
                            <h6>Đề cương dạng</h6>
                            <p>File Word</p>
                        </div>
                        <Button>Xem chi tiết đề cương</Button>
                    </div>
                </div>
                {/* page size */}
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    );
};

export default Home;
