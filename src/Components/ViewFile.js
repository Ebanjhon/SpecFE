import React, { useState } from 'react'
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ViewFile = React.memo(({ link }) => {

    const docs = [
        { uri: link }, // Remote file
        // { uri: 'http://res.cloudinary.com/dfbykxwru/raw/upload/v1718732543/MauBaoCaoMH.pdf' }, // Remote file
        // { uri: require("./test.docx") }, // Local File
    ];

    const [activeDocument, setActiveDocument] = useState(docs[0]);

    const handleDocumentChange = (document) => {
        setActiveDocument(document);
    };

    return (
        <>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ height: '700px' }}
            />

            {/* <DocViewer
                documents={docs}
                activeDocument={activeDocument}
                onDocumentChange={handleDocumentChange}
                style={{ height: '700px' }}
            /> */}
        </>
    )
});

export default ViewFile
