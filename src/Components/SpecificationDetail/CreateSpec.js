import React, { useContext, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './CreateSpec.css';
import { Button, Form } from 'react-bootstrap';
import APIs, { authApi, endpoints } from '../../Configs/APIs';
import { UserContext } from '../../Configs/Contexts';
import { useNavigate } from 'react-router-dom';

const CreateSpec = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState(); // dữ liệu spec nhap lieu
    const [nameGrad, setNameGrad] = useState('');
    const [loading, setLoading] = useState(false);
    const [userCurrent, dispatch] = useContext(UserContext);
    const [specification, setSpecification] = useState({
        nameSpec: "",
        credit: 2,
        subjectId: "",
        authorId: userCurrent.idUser,
    });
    const editorRef = useRef(null);
    const [status, setStatus] = useState(1);
    const [type, setType] = useState(3);
    const [file, setFile] = useState(null);
    const [subject, setSupject] = useState();
    const fetchSubject = async () => {
        try {
            let response = await authApi().get(endpoints['subjects']);
            setSupject(response.data);
        } catch (error) {

        }
    };
    const [gradingSheet, setGradingSheet] = useState();// lấy các tên cột
    const gradingsheet = async () => {
        try {
            let response = await authApi().get(endpoints['gradingsheet']);
            setGradingSheet(response.data);
        } catch (error) {

        }
    };
    const [granSpec, setGranSpec] = useState();
    useEffect(() => {
        fetchSubject();
        gradingsheet();
    }, []);

    // hàm để tạo cột điểm\
    const createGradingSheet = async () => {
        try {
            let response = await authApi().post(endpoints['gradingsheet'], { nameColumn: nameGrad });
            // console.log(response.data);
        } catch (error) {

        }
        setNameGrad('');
        gradingsheet();
    };
    // chứa đối tượng cột điểm
    const [gradSpec, setGradSpec] = useState([
        { idGrad: 1, percent: 40 },
        { idGrad: 2, percent: 60 },
    ]);

    // Hàm để thêm một cột điêm
    const addGradSpec = () => {
        if (gradSpec.length < 5) {
            const newGradSpec = { idGrad: 0, percent: 10 }; // Ví dụ với percent mặc định là 50
            setGradSpec([...gradSpec, newGradSpec]);
        }
    };

    // Hàm xử lý sự kiện để cập nhật giá trị của trường nhập liệu
    const updatePercent = (index, newPercent) => {
        setGradSpec(prevState =>
            prevState.map((item, idx) =>
                idx === index ? { ...item, percent: newPercent } : item
            )
        );
    };
    // hàm xóa gradSpec theo index
    const deleteGradSpec = (indexToDelete) => {
        setGradSpec(prevState => prevState.filter((item, index) => index !== indexToDelete));
    };

    // hàm lây file
    const takeFile = (e) => {
        const selectedFile = e.target.files[0]; // Lấy tệp đầu tiên từ danh sách các tệp đã chọn
        setFile(selectedFile); // Cập nhật state với tệp đã chọn
        if (selectedFile) {
            const fileName = selectedFile.name; // Lấy tên của tệp
            const fileExtension = fileName.split('.').pop(); // Lấy phần mở rộng của tệp
            // Kiểm tra xem phần mở rộng có phải là docx hoặc pdf
            if (fileExtension === 'docx') {
                setType(1);
            } else if (fileExtension === 'pdf') {
                setType(2);
            }
        }
    };

    // // hàm lấy dữ liệu đang nhâp
    // const log = () => {
    //     if (editorRef.current) {
    //         const dataText = editorRef.current.getContent();
    //         setContent(dataText); // Cập nhật state content với giá trị mới
    //     }
    // };

    // useEffect(() => {
    //     console.log("ok"); // Hiển thị giá trị content sau khi đã được cập nhật
    // }, [content]);

    // hàm chọn slect
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setType(3);
    };
    // hàm chọn tên cột
    const handleChange = (e, index) => {
        setGradSpec(prevState =>
            prevState.map((item, idx) =>
                idx === index ? { ...item, idGrad: e.target.value } : item
            )
        );
        console.log(gradSpec);
    };

    // hàm tạo đề cương 
    const createSpec = async (e) => {
        e.preventDefault();
        // log();
        console.log(editorRef.current.getContent());
        const hasIdGradZero = gradSpec.some(spec => spec.idGrad === 0);
        if (
            specification.nameSpec === "" || specification.nameSpec === null ||
            specification.subjectId === null || specification.subjectId === '' ||
            (type !== 3 && (file === undefined || file === null)) || hasIdGradZero
        ) {
            alert("vui lòng điền đầy đủ");
        } else {
            let gradArray = [];
            let percentArray = [];
            // Duyệt qua từng phần tử trong gradSpec
            gradSpec.forEach(item => {
                gradArray.push(item.idGrad); // Thêm idGrad vào mảng grad
                percentArray.push(item.percent / 100); // Chuyển đổi percent thành decimal và thêm vào mảng percent
            });
            // Chuyển mảng grad thành string '1,2'
            let gradString = gradArray.join(',');
            // Chuyển mảng percent thành string '0.4,0.6'
            let percentString = percentArray.join(',');
            let formData = new FormData();
            if (type !== 3)
                formData.append('file', file);
            formData.append('nameSpec', specification.nameSpec);
            formData.append('credit', specification.credit);
            formData.append('content', editorRef.current.getContent());
            formData.append('subjectId', specification.subjectId);
            formData.append('typeSpecId', type);
            formData.append('authorId', specification.authorId);
            formData.append('idgradingSheets', gradString);
            formData.append('gradWaves', percentString);

            // Xuất ra các đối tượng trong FormData
            formData.forEach((value, key) => {
                console.log(key, value);
            });

            try {
                setLoading(true);
                let response = await authApi().post(endpoints["create-specification"], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 201)
                    console.log(response.data); // Hiển thị thông báo từ phản hồi
                setTimeout(async () => {
                    setLoading(false);
                    alert("Đăng tải đề cương thành công, bấm ok để về trang chủ!");
                    navigate('/');
                }, 100);
            } catch (error) {
                setLoading(false);
                console.error("Đăng bài thất bại:", error);
                if (error.code === "ERR_NETWORK") {
                    alert("Lỗi server!");
                }
            }
        }
    };

    // ham nhâp dữ liệu các trường
    const change = (field, e) => {
        setSpecification(s => ({ ...s, [field]: e }));
    };

    return (
        <div className='mtop height-min text-editor'>
            {/* <div class="alert alert-success thong-bao" role="alert">
                Đăng tải đề cương thành công!
            </div> */}
            <div className='top-view-create'>
                <h3>Soạn đề cương </h3>
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
                    <input
                        type="file"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        accept=".docx,.pdf"
                        onChange={takeFile}
                    />
                </div>
            </>)}
            <Form className='form-infor form-cot-diem' onSubmit={createSpec}>
                <Form.Group controlId="formUsername" className="label-input">
                    <Form.Label className="label">Tạo tên cột điểm mới</Form.Label>
                    <Form.Control
                        className="input-regist"
                        type="text"
                        name="username"
                        value={nameGrad}
                        placeholder="Nhập tên cột điểm"
                        onChange={e => setNameGrad(e.target.value)}
                    />
                </Form.Group>
                <Button variant="warning" onClick={createGradingSheet}>Tạo tên cột</Button>
            </Form>
            <Form className='form-infor' onSubmit={createSpec}>
                <div class="mb-3">
                    <label className="form-label">Nhập tên cho đề cương</label>
                    <input type="text"
                        class="form-control"
                        onChange={e => change('nameSpec', e.target.value)}
                        placeholder='Enter name for Specification'
                        value={specification.nameSpec}
                    />
                    <label className="form-label">Môn học</label>
                    <div style={{ height: '46px' }} className='d-flex'>
                        <Form.Select class="form-select"
                            onChange={e => change('subjectId', e.target.value)}
                            aria-label="Default select example"
                            value={specification.subjectId}
                            style={{ width: '50%', marginRight: '20px' }}>
                            <option value="" disabled selected>Chọn môn học</option> {/* Tùy chọn mặc định */}
                            {subject && <>
                                {subject.map(m => (<><option value={m.idSubject} selected>{m.nameSubject}</option></>))}
                            </>}
                        </Form.Select >
                        <div className="input-group mb-3" style={{ width: '200px', marginRight: '20px' }}>
                            <span className="input-group-text">Tín chỉ</span>
                            <input
                                type="number"
                                value={specification.credit}
                                onChange={e => change('credit', e.target.value)}
                                className="form-control"
                                placeholder="Enter credit"
                                min='2' max='4' />
                        </div>
                        <Button variant="warning" onClick={addGradSpec}>Thêm cột điểm</Button>
                    </div>
                </div>

                <div className='cotdiems'>
                    <div className='cotdiem'>
                        <Form.Select aria-label="Default select example">
                            {gradingSheet && <>
                                <option value={gradingSheet[1].idGrade}> {gradingSheet[1].nameColumn}</option>
                            </>}
                        </Form.Select>
                        <Form.Group className='label-input-grad d-flex'>
                            <Form.Control
                                className='input-login'
                                type="number"
                                style={{ width: '70px', fontSize: '26px' }}
                                name="username"
                                value={gradSpec[1].percent}
                                min={10}
                                max={90}
                                onChange={(e) => updatePercent(1, parseInt(e.target.value))}
                            /><h2> %</h2>
                        </Form.Group>
                        {/* <Button variant='danger'>Delete</Button> */}
                    </div>

                    <div className='cotdiem'>
                        <Form.Select aria-label="Default select example">
                            {gradingSheet && <>
                                <option value={gradingSheet[0].idGrade}> {gradingSheet[0].nameColumn}</option>
                            </>}
                        </Form.Select>
                        <Form.Group className='label-input-grad d-flex'>
                            <Form.Control
                                className='input-login'
                                type="number"
                                style={{ width: '70px', fontSize: '26px' }}
                                name="username"
                                value={gradSpec[0].percent}
                                min={10}
                                max={90}
                                onChange={(e) => updatePercent(0, parseInt(e.target.value))}
                            /><h2> %</h2>
                        </Form.Group>
                        {/* <Button variant='danger'>Delete</Button> */}
                    </div>
                    {gradSpec.slice(2).map((c, index) => (
                        <div className='cotdiem'>
                            <Form.Select aria-label="Default select example" onChange={(e) => handleChange(e, index + 2)}>
                                <option value="" disabled selected>Chọn cột</option> {/* Tùy chọn mặc định */}
                                {gradingSheet && <>
                                    {gradingSheet.slice(2).map(g => (
                                        <option key={g.idGrade} value={g.idGrade}>
                                            {g.nameColumn}
                                        </option>
                                    ))}
                                </>}
                            </Form.Select>
                            <Form.Group className='label-input-grad d-flex'>
                                <Form.Control
                                    className='input-login'
                                    type="number"
                                    style={{ width: '70px', fontSize: '26px' }}
                                    name="username"
                                    value={c.percent}
                                    min={10}
                                    max={90}
                                    onChange={(e) => updatePercent(index + 2, parseInt(e.target.value))}
                                /><h2> %</h2>
                            </Form.Group>
                            <Button variant='danger' onClick={() => deleteGradSpec(index + 2)}>Xóa cột</Button>
                        </div>
                    ))}
                </div>
                <div className='d-flex justify-content-end btn-spec-create-cancel'>
                    {loading === true ? <><p>Đang xử lý yêu câu vui lòng chờ giây lát...</p><div class="loader-create-spec"></div></> : <>
                        <Button type='submit' variant='success'>Đăng đề cương</Button>
                    </>}
                    {/* <Button variant='danger' onClick={log}>Hủy</Button> */}
                </div>
            </Form>

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
        </div >
    );
}

export default CreateSpec;
