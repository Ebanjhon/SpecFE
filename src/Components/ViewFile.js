import React from 'react'
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ViewFile = React.memo(({ link, type }) => {

    const docs = [
        { uri: link },
    ];

    return (
        <>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ height: '700px', overflow: 'auto' }}
            />
        </>

    )
});

export default ViewFile
