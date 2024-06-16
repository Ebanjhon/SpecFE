import './App.css';
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function View() {
    const docs = [
        { uri: "https://res.cloudinary.com/drosiimsz/raw/upload/v1718486154/zyq4oz7mkuizdmgwbvoh.docx" }, // Remote file
        // { uri: require("./hehe.pdf") }, // Local File
    ];

    return (
        <div className="App">
            <h1>test</h1>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{
                    height: '900px'
                }}
            />
        </div>
    );
}

export default View;
