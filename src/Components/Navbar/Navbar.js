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
const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, dispatch] = useContext(UserContext);
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
                        <Link to={'/register'}><button type="button" class="btn btn-primary" style={{ width: "100px" }}>Đăng ký</button></Link>
                    </div>
                </>) : (<>
                    <div className="nav-right" style={{ width: '260px' }}>
                        <Link to={'/'}><BsCoin style={{ fontSize: '30px', color: 'yellowgreen', lineHeight: '44px' }} /></Link>
                        <h4 style={{ lineHeight: '44px', color: 'brown' }}>0</h4>
                        <p style={{ fontSize: '20px', lineHeight: '44px' }} >Xin chào {user.username}</p>
                        <img src={user.avatar} style={{ width: '44px', height: '44px' }} />
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
                    <Link to={'/'} ><div className='btn'><GrNotes /> Đề cương của tôi</div></Link>
                    <Link to={'/chat'} onClick={showSideBar}><div className='btn'><BiSolidMessageDetail /> Trò chuyện</div></Link>
                    <Link to={'/'} ><div className='btn'><SlCalender /> Calenders</div></Link>
                </div>
                {user && (<>
                    {user.role !== 'ROLE_STUDENT' && (<>
                        add specification
                        <Link to={'/spec-editer'}>
                            <div className='add-spec d-flex justify-content-center align-items-center btn' onClick={showSideBar}>
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
