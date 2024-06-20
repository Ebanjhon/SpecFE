import React, { useState } from 'react'
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ViewFile = React.memo(({ link, type }) => {

    const docs = [
        { uri: link },
    ];


    // const [activeDocument, setActiveDocument] = useState(docs[0]);

    // const handleDocumentChange = (document) => {
    //     setActiveDocument(document);
    // };

    return (
        <>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ height: '700px', overflow: 'auto' }}
            />

            {/* <DocViewer
                documents={docs}
                activeDocument={activeDocument}
                onDocumentChange={handleDocumentChange}
                style={{ heightL: '500px' }}
            /> */}
        </>

    )
});

export default ViewFile
