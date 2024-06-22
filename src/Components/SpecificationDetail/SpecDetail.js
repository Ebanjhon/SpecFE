import React, { useContext, useEffect, useRef, useState } from 'react'
import './SpecDetail.css'
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPaperPlane } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import { Button, Table } from 'react-bootstrap';
import ViewFile from '../ViewFile';
import { Editor } from '@tinymce/tinymce-react';
import { useLocation } from 'react-router-dom';
import APIs, { authApi, endpoints } from '../../Configs/APIs';
import { UserContext } from '../../Configs/Contexts';
import { FaFileDownload } from "react-icons/fa";
import { saveAs } from 'save-as';
import html2pdf from 'html2pdf.js';
const SpecDetail = () => {
    // dùng để lấy dữ liệu truyền qua state
    const location = useLocation();
    const { spec } = location.state || {};
    // const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState(false);
    const [content, setContent] = useState('');
    const [userCurrent, dispatch] = useContext(UserContext);
    const [comment, setComment] = useState(null);
    const [gradSpec, setGradSpec] = useState(null);
    const [childContent, setChildContent] = useState({});
    // hàm định dạng ngày
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };
    // fetch comments
    const fetchComments = async () => {
        if (comment === null)
            setLoading(true);
        try {
            let response = await authApi().get(endpoints['comment'](spec.idSpec));
            setComment(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Xử lý lỗi 404
                console.log('Comments not found (404)');
                // Bạn có thể đặt logic xử lý khác ở đây, ví dụ: hiển thị thông báo lỗi
                setComment([]);
            } else {
                // Xử lý các lỗi khác
                console.log(error);
            }
        }
    };

    const fetchCotDiems = async () => {
        try {
            let response = await authApi().get(endpoints['gradSpec'](spec.idSpec));
            setGradSpec(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAuthor = async () => {
        try {
            let response = await authApi().get(endpoints['get-author'](spec.author.idUser));
            setAuthor(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Xử lý lỗi 404
                console.log('Author not found (404)');
                // Bạn có thể đặt logic xử lý khác ở đây, ví dụ: hiển thị thông báo lỗi
                setComment([]);
            } else {
                // Xử lý các lỗi khác
                console.log(error);
            }
        }
    };

    useEffect(() => {
        setLoading(false);
    }, [comment])

    useEffect(() => {
        fetchComments();
        fetchAuthor();
        fetchCotDiems();
    }, [])

    const crt_comment_parent = async () => {
        if (content !== '') {
            try {
                const commentData = {
                    content: content,
                    userId: userCurrent.idUser,
                };
                await authApi().post(endpoints['create-comment-parent'](spec.idSpec), commentData);
            } catch (error) {
                // handle error
            } finally {
                fetchComments();
                // setContent('');
            }
        }
    };

    const crt_comment_child = async (idParent) => {
        if (childContent[idParent] !== '') {
            try {
                const commentData = {
                    content: childContent[idParent],
                    userId: userCurrent.idUser,
                };
                await authApi().post(endpoints['create-comment-child'](idParent), commentData);
            } catch (error) {
                // handle error
            } finally {
                fetchComments();
                setChildContent({ ...childContent, [idParent]: '' });
            }
        }
    };

    // xóa comment
    const delete_comment = async (idCmt) => {
        // console.log(idCmt);
        try {
            const response = await authApi().delete(endpoints['delete-comment'](idCmt));
        } catch (error) {

        } finally {
            fetchComments();
        }
    };

    const handleParentCommentSubmit = () => {
        crt_comment_parent();
        setContent('');
    };

    const handleChildCommentSubmit = async (parentId) => {
        await crt_comment_child(parentId);
        setChildContent({ ...childContent, [parentId]: '' });
    };

    // tải file xuong
    const downloadFile = async () => {
        try {
            let response = await authApi().get(endpoints['check-spec'](userCurrent.idUser, spec.idSpec));
            console.log(response.data);
            if (response.data) {// nếu đã tải
                const response = await fetch(spec.fileSpec);
                const blob = await response.blob();
                if (spec.typeofspecifi.idType === 1)
                    saveAs(blob, 'decuong.docx');
                else if (spec.typeofspecifi.idType === 2)
                    saveAs(blob, 'decuong.pdf');
                else
                    handleExportPDF();
            } else {// nếu cưa tải thì thanh toán và trừ coin
                setTimeout(async () => {
                    try {
                        const u = await authApi().post(endpoints['save-spec'](userCurrent.idUser, spec.idSpec));
                        if (u.status === 200) {
                            const response = await fetch(spec.fileSpec);
                            const blob = await response.blob();
                            if (spec.typeofspecifi.idType === 1)
                                saveAs(blob, 'decuong.docx');
                            else if (spec.typeofspecifi.idType === 2)
                                saveAs(blob, 'decuong.pdf');
                            else
                                handleExportPDF();
                            // cập nhật coin
                            setTimeout(async () => {
                                const u = await authApi().get(endpoints['current-user']);
                                sessionStorage.setItem('user', JSON.stringify(u.data));
                                dispatch({
                                    "type": "login",
                                    "payload": u.data
                                });
                            }, 100);
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Bạn không đủ Xu để tải đề cương này, Hãy nạp thêm Xu để tải tài liệu xuống!😁");
                    }
                }, 100);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // tải text to pdf
    const handleExportPDF = () => {
        // Thiết lập các tùy chọn cho việc chuyển đổi
        const options = {
            margin: 1,
            filename: 'download.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Chuyển đổi HTML thành PDF
        html2pdf().from(spec.content).set(options).save();
    };
    return (
        <div className='mtop height-min d-flex justify-content-center height-min'>
            <div className='infor-author-spec d-flex'>
                <h4>Thông tin tác giả</h4>
                <div className='text-infor'>
                    {author !== null && (<>
                        <div className='infor-user' style={{ marginBottom: "10px" }}>
                            <div className='avatar-author' style={{ width: '90px', marginRight: '10px' }}><img src={author.avatar} /></div>
                            <div className='infor-sidebar'>
                                <p>Teacher 🧑‍🎓</p>
                                <h5>{author.username}</h5>
                            </div>
                        </div>
                        <h6><h5>Mã Giảng viên: </h5>{author.idUser}</h6>
                        <h6><h5>Họ tên: </h5>{author.firstname} {author.lastname}</h6>
                        <h6><h5>Quê quán: </h5>{author.address}</h6>
                        <h6><h5>SĐT: </h5>{author.phone}</h6>
                        <h6><h5>Email: </h5>{author.email}</h6>
                        <h6><h5>Ngày sinh: </h5>{formatDate(author.dateOfBirth)} </h6>
                    </>)}
                </div>
            </div>

            <div className="container-spec-comments-view">

                <div className='spec-view'>
                    <div className='icon-download' onClick={downloadFile}>
                        <FaFileDownload />
                    </div>
                    {/* // hiển thị nội dung soạn */}
                    {spec.typeofspecifi.idType === 3 ? (<>
                        <Editor
                            value={spec.content}
                            init={{
                                height: '700',
                                width: '100%',
                                menubar: false,
                                toolbar: false,
                                readonly: true, // Make the editor read-only
                                plugins: [],
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            disabled={true} // Disable user interactions
                        />

                    </>) : (<>
                        <ViewFile link={spec.fileSpec} type={spec.typeofspecifi.idType} />
                    </>)}
                    <Table striped bordered hover>
                        {gradSpec !== null && <>
                            <thead>
                                <tr>
                                    {gradSpec.map(s => (
                                        <th>{s.grandeID.nameColumn}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {gradSpec.map(s => (
                                        <td>{s.weight * 100} %</td>
                                    ))}
                                </tr>
                            </tbody>
                        </>}
                    </Table>
                </div>
                <h5>Vùng bình luận</h5>

                {/* nhập binh luận */}
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        <div className='form-comment'>
                            <Button variant="warning"><MdOutlineInsertEmoticon /></Button>
                            <input
                                type='text'
                                placeholder='viết bình luận mới'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button onClick={handleParentCommentSubmit}><IoPaperPlane /></Button>
                        </div>

                        <div className='comments'>
                            {comment && comment.map(cmt => (
                                <div key={cmt.idComment} className='comment view-cmt-type'>
                                    <div className='comment'>
                                        <img src={cmt.user.avatar} alt={`${cmt.user.username}'s avatar`} />
                                        <div className='content-cmt'>
                                            <p><h2 style={{ display: 'inline' }}>{cmt.user.username} </h2> {cmt.content}</p>
                                            <div className='btn-cmt'>
                                                <button>Reply <FaArrowTurnDown /></button>
                                                {userCurrent.idUser === cmt.user.idUser && (
                                                    <button onClick={() => delete_comment(cmt.idComment)}>Remove <MdOutlineDeleteForever /></button>
                                                )}
                                            </div>
                                            {cmt.childComments.map(cm => (
                                                <div key={cm.idComment} className='comment'>
                                                    <img src={cm.user.avatar} alt={`${cm.user.username}'s avatar`} />
                                                    <div className='cmt-child'>
                                                        <p><h2 style={{ display: 'inline' }}>{cm.user.username}</h2> {cm.content}</p>
                                                        <div className='btn-cmt d-flex'>
                                                            {userCurrent.idUser === cm.user.idUser && (
                                                                <button onClick={() => delete_comment(cm.idComment)}>Remove <MdOutlineDeleteForever /></button>
                                                            )}
                                                            <div className='time-cmt'>23:03 12/3/2024</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='time-cmt'>23:03 12/3/2024</div>
                                    </div>
                                    <div className='form-comment'>
                                        <Button variant="warning"><MdOutlineInsertEmoticon /></Button>
                                        <input
                                            type='text'
                                            placeholder='viết bình luận'
                                            value={childContent[cmt.idComment] || ''}
                                            onChange={(e) => setChildContent({ ...childContent, [cmt.idComment]: e.target.value })}
                                        />
                                        <Button onClick={() => handleChildCommentSubmit(cmt.idComment)}><IoPaperPlane /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>

            <div className='infor-author-spec d-flex'>
                <h4>Thông tin đề cương</h4>
                <div className='text-infor'>
                    <h6><h5>Tên đề cương: </h5>{spec.nameSpec}</h6>
                    <h6><h5>Mã đề cương: </h5>{spec.idSpec}</h6>
                    <h6><h5>Ngày đăng: </h5>{formatDate(spec.dateCreate)}</h6>
                    <h6><h5>Tín chỉ: </h5>{spec.credit}</h6>
                    <h6><h5>Môn: </h5>{spec.subject.nameSubject}</h6>
                    <h6><h5>loại đề cương: </h5>{spec.typeofspecifi.nameType}</h6>
                    {/* <h6><h5>Hội đồng xét duyệt: </h5>10094</h6>
                    <h6><h5>Chủ tịch: </h5>Nguyễn văn A</h6>
                    <h6><h5>Thư ký: </h5>Nguyễn văn C</h6> */}
                    {/* <button onClick={handleExportPDF}>Export to PDF</button> */}
                </div>
            </div>
        </div>
    )
}

export default SpecDetail
