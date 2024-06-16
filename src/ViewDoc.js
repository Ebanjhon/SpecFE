import './App.css';
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function ViewDoc() {
    const docs = [
        { uri: "https://res.cloudinary.com/drosiimsz/raw/upload/v1718330506/ehe6pcmmbrob2uv8xdrb.docx" }, // Remote file
        // { uri: require("./test.docx") }, // Local File
    ];

    return (
        <div className="App">
            <h1>test</h1>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
            />
        </div>
    );
}

export default ViewDoc;


