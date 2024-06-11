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

    const offShow = () => {
        console.log("ok");
    }

    return (
        <>
            <nav className="navbar navbar fixed-top">
                <div className="nav-left">
                    {user && (
                        <>
                            <TiThMenu className='btn btn-menu' onClick={showSideBar} />
                        </>
                    )}
                    <h1>Logo</h1>
                </div>
                <div className="nav-center"><h2>SPECIFICATION</h2></div>
                {!user ? (<>
                    <div className="nav-right">
                        <Link to={"login"}><button type="button" class="btn btn-outline-primary" style={{ width: "120px" }}>Đăng nhập</button></Link>
                        <Link to={'/register'}><button type="button" class="btn btn-primary" style={{ width: "100px" }}>Đăng ký</button></Link>
                    </div>
                </>) : (<>
                    <div className="nav-right" style={{ width: '260px' }}>
                        <p style={{ fontSize: '20px', lineHeight: '44px' }} >Xin chào jhon123</p>
                        <img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' style={{ width: '44px', height: '44px' }} />
                        {/* <button type="button" class="btn btn-primary" style={{ width: "100px" }} onClick={logout}>Logout</button> */}
                    </div>
                </>)}

            </nav>
            <div className={`side-bar ${isSidebarOpen ? 'open' : ''}`} style={{ position: 'fixed', zIndex: '99' }}>
                <div className='infor-user'>
                    <div className='avatar-sidebar'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                    <div className='infor-sidebar'>
                        <p>Teacher 🧑‍🎓</p>
                        <h3>Y Jhon Êban</h3>
                    </div>
                </div>
                service
                <div className='sidebar-service'>
                    <Link to={'/'} onClick={showSideBar}><div className='btn'><HiHome /> Home</div></Link>
                    <Link to={'/'} ><div className='btn'><AiOutlineFileProtect /> Duyệt khảo sát</div></Link>
                    <Link to={'/'} ><div className='btn'><GrNotes /> Đề cương của tôi</div></Link>
                    <Link to={'/chat'} onClick={showSideBar}><div className='btn'><BiSolidMessageDetail /> Trò chuyện</div></Link>
                    <Link to={'/'} ><div className='btn'><SlCalender /> Calenders</div></Link>
                </div>
                add specification
                <div className='add-spec'>

                </div>
                <hr className='hr-border' />
                <Link to={'/logout'}><div className='sidebar-logout btn btn-outline-primary' onClick={logout}><h3>Logout <HiOutlineLogout /></h3></div></Link>
            </div>

            <div className={`${isSidebarOpen ? 'show-visual-box' : 'un-show-visual-box'}`} onClick={showSideBar} style={{ position: 'fixed', zIndex: '50', width: '100%', height: '100%' }}></div>
        </>
    )
};

export default Navbar;
