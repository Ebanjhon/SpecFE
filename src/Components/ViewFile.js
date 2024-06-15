import React from 'react'
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ViewFile = React.memo(({ link }) => {

    const docs = [
        { uri: link }, // Remote file
        // { uri: 'http://it.ou.edu.vn/asset/ckfinder/userfiles/5/files/KHMT%20ITEC1401%20Nhap%20Mon%20Tin%20Hoc%20300622.pdf' }, // Remote file
        // { uri: require("./test.docx") }, // Local File
    ];

    return (
        <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ height: '700px' }}
        />
    )
});

export default ViewFile
