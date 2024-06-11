import { Button } from 'react-bootstrap';
import './Chat.css';
import { MdAttachFile } from "react-icons/md";
import { IoPaperPlane } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";
import { useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";

const Chat = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="mtop d-flex justify-content-center align-items-center">
            <div className="chatbox ">
                <div className='list-chat d-flex justify-content-center align-items'>
                    <h2 className='white-text'>Chat <IoChatboxEllipses /></h2>
                    <div className='search-user'>
                        <input type='text'
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder='Find by username'
                        />
                        <RiSearchLine />
                    </div>
                    {isFocused && <div className="focus-div">
                        {/* <p>Không tim thấy kết quả nào</p> */}

                        <div className='item-result'>
                            <div className='avatar-chat'><img style={{ width: '60px' }} src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='infor-friend'>
                                <p style={{ fontStyle: 'italic' }}>(Teacher)</p>
                                <h5>Nguyễn Văn Mau</h5>
                            </div>
                            <IoMdAddCircle style={{ fontSize: '50px', cursor: 'pointer', marginLeft: '20px', color: '#00A183' }} />
                        </div>

                    </div>}
                    <div className='list-chat-user'>
                        <h6>List friends</h6>

                        <div className='friend-item btn'>
                            <div className='avatar-chat'><img style={{ width: '60px' }} src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='infor-friend'>
                                <p style={{ fontStyle: 'italic' }}>(Teacher)</p>
                                <h5>Nguyễn Văn Mau</h5>
                                <span>nội dung tin nhắn...</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='content-chat'>
                    <div className='to-user-chat-infor'>
                        {/* <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div> */}
                        <h4>Nguyễn Văn Mau</h4>
                        <p>(Teacher)</p>
                    </div>
                    <div className='text-chats'>
                        <div className='text-friend'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                Trong các hệ đếm cơ số từ 15 trở lên, E được sử dụng như ký hiệu của số 14. Xem thêm hệ thập lục phân.
                            </div>
                        </div>

                        <div className='text-friend'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                Troêm hệ thập lục phân.
                            </div>
                        </div>

                        <div className='text-user-curent'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                Với cấu trúc trên, các thẻ div trong component React sẽ xuất hiện theo thứ tự ngược lại (từ phải sang trái) nhờ vào thuộc tính flex-direction: row-reverse.
                            </div>
                        </div>

                        <div className='text-user-curent'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                vào thuộc tính flex-direction: row-reverse.
                            </div>
                        </div>

                        <div className='text-friend'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                Troêm hệ thập lục phân.
                            </div>
                        </div>

                        <div className='text-friend'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                Troêm hệ thập lục phân.
                            </div>
                        </div>

                        <div className='text-user-curent'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                vào thuộc tính flex-direction: row-reverse.
                            </div>
                        </div>

                        <div className='text-user-curent'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                vào thuộc tính flex-direction: row-reverse.
                            </div>
                        </div>

                        <div className='text-friend'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                Mai đi chơi đi nhé bạn.
                            </div>
                        </div>

                        <div className='text-user-curent'>
                            <div className='avatar-chat'><img src='https://i.pinimg.com/originals/d2/83/c2/d283c21ab422417da77f03474e15ba49.jpg' /></div>
                            <div className='text'>
                                vào thuộc tính flex-direction: row-reverse.
                            </div>
                        </div>

                    </div>
                    <div className='type-chat'>
                        <MdAttachFile />
                        <input type='text' placeholder='Nhập nội dung tin nhắn'></input>
                        <Button>Send<IoPaperPlane /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Chat;