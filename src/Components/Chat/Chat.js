import { Button } from 'react-bootstrap';
import './Chat.css';
import { MdAttachFile } from "react-icons/md";
import { IoPaperPlane } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { addDoc, collection, onSnapshot, serverTimestamp, where, query } from "firebase/firestore";
import { database } from '../../Configs/Firebase';
import { UserContext } from '../../Configs/Contexts';
import APIs, { BASE_URL, authApi, endpoints } from '../../Configs/APIs';

const Chat = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [load, setLoad] = useState({ room: false, search: false });
    const [strUserName, setStrUserName] = useState('');
    const [messages, setMessages] = useState([]);// dùng để chứa tin nhắn trong phòng
    const [text, setText] = useState(""); // chứa nội dung nhập để chat
    const [roomNumber, setRoomNumber] = useState(null);// số phòng hiện hành
    const [listRoom, setListRoom] = useState([]);// các phòng chat
    const [friend, setFriend] = useState(null);// các phòng chat
    const [userCurrent, dispatch] = useContext(UserContext);// user hiện tại
    const containerRef = useRef(null);
    const [listSearch, setListSearch] = useState(null);// listuserchat
    const inputRef = useRef(null);

    const fetchRoomChat = async () => {
        setLoad((prevLoad) => ({ ...prevLoad, room: true }));
        try {
            let response = await authApi().get(endpoints['room-chat'](userCurrent.idUser));
            setListRoom(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRoomChat();
        searchUserChat();
    }, [])

    const searchUserChat = async () => {
        setLoad((prevLoad) => ({ ...prevLoad, search: true }));

        let url = `${BASE_URL}api/searchusername?username=${strUserName}`;
        try {
            authApi().get(url).then(response => {
                setListSearch(response.data);
            }).catch(error => { });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setLoad((prevLoad) => ({ ...prevLoad, search: false }));
    }, [listSearch])

    useEffect(() => {
        searchUserChat();
    }, [strUserName])

    // hàm lấy dữ liệu từ firebase
    useEffect(() => {
        // Tạo truy vấn với điều kiện lọc theo trường "room"
        const q = query(collection(database, "messenges"), where("room", "==", roomNumber));

        // Đăng ký lắng nghe sự kiện snapshot của truy vấn
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            // Sắp xếp dữ liệu theo thời gian tăng dần
            const sortedData = data.sort((a, b) => a.timestamp - b.timestamp);
            setMessages(sortedData);
        });
        return () => unsubscribe(); // Hủy đăng ký lắng nghe khi component bị hủy

    }, [roomNumber]); // Thêm props.roomNumber vào mảng dependency để useEffect được gọi lại khi giá trị này thay đổi

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // hàm giửi tin nhắn
    const sendMessage = async () => {
        if (text.trim() !== '') {
            try {
                await addDoc(collection(database, "messenges"), {
                    // username: userCurrent.username,
                    idUser: userCurrent.idUser,
                    mess: text,
                    room: roomNumber,
                    timestamp: serverTimestamp(),
                });
                setText("");
            } catch (error) {
                console.error("Error adding document: ", error);
            }
            scrollToBottom();
        }
    };

    // hàm chỉnh giơ
    const formatTime = (timestamp) => {
        if (timestamp) {
            const date = timestamp.toDate();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        return ""; // Trả về một chuỗi rỗng nếu timestamp không tồn tại
    };
    // nhận nút enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // hàm kéo đến vị trí dưới cùng
    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    // hàm chuyển phòng
    const changeRoom = (friend, idRoom) => {
        setRoomNumber(idRoom);
        setFriend(friend);
    };
    // hàm tạo room chat or vào chat
    const chating = async (user) => {
        let result = listRoom.find(i => i.users[0].idUser === parseInt(user.idUser)) || null;
        if (userCurrent.idUser === user.idUser) {// chạt với chính minh

        }
        else if (result != null) {// đã có user chat chung
            changeRoom(result.users[0], result.idRoomChat);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {// tạo phòng chat
            let formData = new FormData();
            formData.append("userId1", userCurrent.idUser);
            formData.append("userId2", user.idUser);
            try {
                let response = await authApi().post(endpoints['create-chat-room'], formData);
                changeRoom(user, response.data);
                if (inputRef.current) {
                    inputRef.current.focus();
                }
                fetchRoomChat();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="mtop d-flex justify-content-center align-items-center chieucao">
            <div className="chatbox">
                <div className='list-chat d-flex justify-content-center align-items'>
                    <h2 className='white-text'>Chat <IoChatboxEllipses /></h2>
                    <div className='search-user'>
                        <input type='text'
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder='Find by username'
                            onChange={e => setStrUserName(e.target.value)}
                        />
                        <RiSearchLine />
                    </div>
                    {isFocused && <div className="focus-div">
                        {load.search === true ? <>
                            <p>Không tim thấy kết quả nào</p>
                        </> : <>
                            {listSearch === null ? <>
                                <p>Không tim thấy kết quả nào</p>
                            </> : <>
                                {listSearch.map(u => (
                                    <div className='item-result' onClick={e => chating(u)} onMouseDown={(e) => e.preventDefault()}>
                                        <div className='avatar-chat'><img style={{ width: '60px', height: '60px' }} src={u.avatar} /></div>
                                        <div className='infor-friend'>
                                            <p style={{ fontStyle: 'italic' }}>(Teacher)</p>
                                            <h5>{u.username}</h5>
                                        </div>
                                        <IoMdAddCircle style={{ fontSize: '50px', cursor: 'pointer', marginLeft: '20px', color: '#00A183' }} />
                                    </div>
                                ))}
                            </>}
                        </>}
                    </div>}
                    <div className='list-chat-user'>
                        <h6>List friends</h6>
                        {/* danh sach các phòng chat */}
                        {listRoom !== null && (
                            <>
                                {listRoom.map(room => (
                                    <div className='friend-item btn' onClick={() => changeRoom(room.users[0], room.idRoomChat)}>
                                        <div className='avatar-chat'><img style={{ width: '60px', height: '60px' }} src={room.users[0].avatar} /></div>
                                        <div className='infor-friend'>
                                            <p style={{ fontStyle: 'italic' }}>{room.users[0].username}({room.users[0].role})</p>
                                            <h5>{room.users[0].firstname} {room.users[0].lastname}</h5>
                                            <span>nội dung tin nhắn...</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                {/* cửa sổ chat */}
                <div className='content-chat'>
                    <div className='to-user-chat-infor'>
                        {friend !== null && (<>
                            <h4>{friend.firstname}</h4>
                            <p style={{ fontSize: '14px', marginLeft: '5px' }}>({friend.role})</p>
                        </>)}
                    </div>
                    {friend === null ? (<>
                        <h2 style={{ width: '100%', height: '100%', textAlign: 'center', color: 'grey', alignContent: 'center' }}>Hãy bắt đầu cuộc trò chuyện</h2>
                    </>) : (<>
                        <div className='text-chats' ref={containerRef}>
                            {messages.map((message) => (
                                <div className={userCurrent.idUser !== message.idUser ? 'text-friend' : 'text-user-curent'} >
                                    <div className='avatar-chat'><img src={userCurrent.idUser !== message.idUser ? (friend.avatar) : (userCurrent.avatar)} /></div>
                                    <div className='text'>
                                        {message.mess}
                                        <p style={{ fontSize: '14px', color: 'gray' }}>{formatTime(message.timestamp)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='type-chat'>
                            <MdAttachFile />
                            <input type='text' value={text} ref={inputRef} onKeyDown={handleKeyPress} onChange={(e) => setText(e.target.value)} placeholder='Nhập nội dung tin nhắn'></input>
                            <Button onClick={sendMessage}>Send<IoPaperPlane /></Button>
                        </div>
                    </>)}
                </div>
            </div>
        </div >
    )
};

export default Chat;