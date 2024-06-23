// import React from 'react'
// import "@cyntler/react-doc-viewer/dist/index.css";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

// const ViewFile = React.memo(({ link, type }) => {

//     const docs = [
//         { uri: link },
//     ];

//     return (
//         <>
//             <DocViewer
//                 documents={docs}
//                 pluginRenderers={DocViewerRenderers}
//                 style={{ height: '700px', overflow: 'auto' }}
//             />
//         </>

//     )
// });

// export default ViewFile


import React, { useState, useEffect } from 'react';
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ViewFile = React.memo(({ link, type }) => {
    const [docs, setDocs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLink = async () => {
            try {
                const response = await fetch(link);
                if (!response.ok) {
                    throw new Error('Lỗi cloudinary không thể hiển thị file của bạn');
                }
                setDocs([{ uri: link }]);
                setError(null);
            } catch (error) {
                setError(error.message);
                setDocs([]);
            }
        };

        checkLink();
    }, [link]);

    return (
        <>
            {error ? (
                <div style={{ color: 'red' }}>
                    {error}
                </div>
            ) : (
                <DocViewer
                    documents={docs}
                    pluginRenderers={DocViewerRenderers}
                    style={{ height: '700px', overflow: 'auto' }}
                />
            )}
        </>
    );
});

export default ViewFile;
