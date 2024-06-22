import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import { UserContext } from '../../Configs/Contexts';
import { Link, useNavigate } from 'react-router-dom';
import { PiStudentFill } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { GrNotes } from "react-icons/gr";
import { AiOutlineFileProtect } from "react-icons/ai";
import { BiSolidMessageDetail } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import './Pay.css';
import { authApi, endpoints } from '../../Configs/APIs';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, dispatch] = useContext(UserContext);
    const [showBox, setShowBox] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        setIsSidebarOpen(false);
        navigate("/logout");
    }

    const showSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const userDetail = () => {
        showSideBar();
        navigate("/user-infor");
    }
    // gọi hàm thanh toán
    const payCoin = async (e) => {
        let formData = new FormData();

        formData.append("username", user.username);
        formData.append("amount", e);
        try {
            let response = await authApi().post(endpoints['vn-pay'], formData);
            let redirectUrl = response.data;

            // Mở tab mới và chuyển đến đường dẫn từ response.data
            window.open(redirectUrl, "_blank");
        } catch (error) {
            console.error(error);
        }
    }
    // gọi box lên
    const toggleBox = () => {
        setShowBox(!showBox); // Đảo ngược trạng thái hiển thị của box
    };
    // Kiểm tra nếu đang ở trang 404 thì không hiển thị Navbar
    return (
        <>
            <nav className="navbar fixed-top">
                <div className="nav-left">
                    {user && (
                        <>
                            <TiThMenu className='btn btn-menu' onClick={showSideBar} />
                        </>
                    )}
                    <Link to={'/'}><img src='./images/images.png' style={{ width: '60px', height: '60px', marginRight: '50px' }} /></Link>

                </div>

                <div className="nav-center"><h2>Đại học Mở</h2></div>
                {!user ? (<>
                    <div className="nav-right">
                        <Link to={"login"}><button type="button" class="btn btn-outline-primary" style={{ width: "120px" }}>Đăng nhập</button></Link>
                        <Link to={'/register'}><button type="button" class="btn btn-primary" style={{ width: "100px", marginRight: '25px' }}>Đăng ký</button></Link>
                    </div>
                </>) : (<>
                    <div className="nav-right" style={{ width: 'auto' }}>
                        {user.role === 'ROLE_STUDENT' && (<>
                            <BsCoin className='coinbs' onClick={toggleBox} />
                            <h4 style={{ lineHeight: '44px', color: 'brown', margin: '0px 5px' }}>{user.coin}</h4>
                        </>)}
                        <p style={{ fontSize: '20px', lineHeight: '44px', margin: '0px 5px' }} >Xin chào {user.username}</p>
                        <img src={user.avatar} style={{ width: '44px', height: '44px' }} />

                        <div className={` ${!showBox ? 'box-buy-coin' : 'box-buy-coin-show'}`} style={{ height: '300px' }}>
                            <h5>Thanh Toán VNPay</h5>
                            <div className='item-pay' style={{ height: '250px' }} >
                                <div className='item-packet' style={{ height: '70px' }} onClick={() => payCoin(10000)}>
                                    <h3>10.000.VND</h3>
                                    <p>/10 Coin</p>
                                </div>

                                <div className='item-packet' style={{ height: '70px' }} onClick={() => payCoin(20000)}>
                                    <h3>20.000.VND</h3>
                                    <p>/20 Coin</p>
                                </div>

                                <div className='item-packet' style={{ height: '70px' }} onClick={() => payCoin(50000)}>
                                    <h3>50.000.VND</h3>
                                    <p>/50 Coin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}

            </nav>

            <div className={`side-bar ${isSidebarOpen ? 'open' : ''}`} style={{ position: 'fixed', zIndex: '99' }}>
                {user && (
                    <div className='infor-user' onClick={userDetail}>
                        <div className='avatar-sidebar'><img src={user.avatar} /></div>
                        <div className='infor-sidebar'>
                            <p>{user.role} 🧑‍🎓</p>
                            <h3>{user.firstname} {user.lastname}</h3>
                        </div>
                    </div>
                )}
                <hr className='hr-border' />

                service
                <div className='sidebar-service'>
                    <Link to={'/'} onClick={showSideBar}><div className='btn'><HiHome /> Home</div></Link>
                    {user && (<>
                        {user.role !== 'ROLE_STUDENT' && (<>
                            <Link to={'/'} ><div className='btn'><AiOutlineFileProtect /> Duyệt đề cương</div></Link>
                        </>)}
                    </>)}
                    <Link to={'/My-spec'} onClick={showSideBar}><div className='btn'><GrNotes /> Đề cương của tôi</div></Link>
                    <Link to={'/chat'} onClick={showSideBar}><div className='btn'><BiSolidMessageDetail /> Trò chuyện</div></Link>
                    <Link to={'/'} ><div className='btn'><SlCalender /> Calenders</div></Link>
                </div>
                {user && (<>
                    {user.role !== 'ROLE_STUDENT' && (<>
                        add specification
                        <Link to={'/spec-editer'}>
                            <div className='add-spec d-flex justify-content-center align-items-center btn' onClick={showSideBar} style={{ backgroundColor: '#d3d3d3' }}>
                                <h5>Soạn Đề Cương</h5>
                                <FaPlus className='plus-icon' />
                            </div>
                        </Link>
                    </>)}
                </>)}
                <hr className='hr-border' />
                <Link to={'/logout'}><div className='sidebar-logout btn btn-outline-primary' onClick={logout}><h3>Logout <HiOutlineLogout /></h3></div></Link>
            </div>

            <div className={`${isSidebarOpen ? 'show-visual-box' : 'un-show-visual-box'}`} onClick={showSideBar} style={{ position: 'fixed', zIndex: '50', width: '100%', height: '100%' }}></div>
        </>
    )
};

export default Navbar;
