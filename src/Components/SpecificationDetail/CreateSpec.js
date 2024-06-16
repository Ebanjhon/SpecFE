import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './CreateSpec.css';

const CreateSpec = () => {
    const [data, setData] = useState("");
    const editorRef = useRef(null);
    const [status, setStatus] = useState(1);
    // hàm lấy dữ liệu đang nhâp
    const log = () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            console.log(content);
            setData(content);
        }
    };

    // hàm chọn slect
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div className='mtop height-min text-editor'>
            <div className='top-view-create'>
                <h3>Soạn đề cương</h3>
                <select className="select-option" aria-label="Default select example" onChange={handleStatusChange}>
                    <option value={1}>Soạn thảo văn bản</option>
                    <option value={2}>Upload File</option>
                </select>
            </div>
            {status == 1 ? (<>
                <Editor
                    onInit={(_evt, editor) => editorRef.current = editor}
                    init={{
                        height: '700',
                        width: '65%',
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </>) : (<>
                <div className="form-infor input-group mb-3 import-file">
                    <input type="file" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                </div>
            </>)}
            <form className='form-infor'>
                <div class="mb-3">
                    <label class="form-label">Nhập tên cho đề cương</label>
                    <input type="text" class="form-control" placeholder='Enter name for Specification' />
                    <div style={{ marginTop: '10px', height: '46px' }} className='d-flex'>
                        <select class="form-select" aria-label="Default select example" style={{ width: '50%', marginRight: '20px' }}>
                            <option value="" disabled selected>Chọn môn học</option>
                            <option value="1">Lập trình mạng</option>
                            <option value="2">Kiểm thử phần mềm</option>
                            <option value="3">Xác xuất thông kê</option>
                        </select>
                        <div className="input-group mb-3" style={{ width: '200px', marginRight: '20px' }}>
                            <span class="input-group-text">Tín chỉ</span>
                            <input type="number" className="form-control" placeholder="Enter credit" min='2' max='5' />
                        </div>
                        <button className="btn btn-primary">Thêm cột điểm</button>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-danger">Đăng đề cương</button>
            </form>

            {/* gọi hàm lấy dữ liệu đang nhập */}
            {/* <button onClick={log}>Log editor content</button> */}
            {/* // hiển thị */}
            {/* <Editor
                value={data}
                init={{
                    height: '700',
                    width: '65%',
                    menubar: false,
                    toolbar: false,
                    readonly: true, // Make the editor read-only
                    plugins: [],
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                disabled={true} // Disable user interactions
            /> */}
        </div>
    );
}

export default CreateSpec;
