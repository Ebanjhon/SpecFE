import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drosiimsz/raw/upload';
const CLOUDINARY_UPLOAD_PRESET = 'egp0b8qw';

const UpFile = () => {
    const [fileUrl, setFileUrl] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFileUrl(response.data.secure_url);
        } catch (error) {
            console.error('Lỗi khi tải lên tệp:', error);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} style={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Kéo và thả tệp vào đây, hoặc nhấp để chọn tệp</p>
            </div>
            {fileUrl && (
                <div>
                    <p>Tệp đã được tải lên thành công: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
                </div>
            )}
        </div>
    );
};

const styles = {
    dropzone: {
        border: '2px dashed #cccccc',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
    },
};

export default UpFile;
