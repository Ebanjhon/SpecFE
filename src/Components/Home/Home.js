import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../Configs/APIs";
import { Button } from "react-bootstrap";
import './Home.css'
const Home = () => {
    const [subjects, setSubjects] = useState(null);

    const fetchSubjects = async () => {
        try {
            let response = await APIs.get(endpoints['subjects']);
            setSubjects(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSubjects();
    }, []);

    const showLog = () => {
        console.log(subjects); // Log subjects instead of setSubjects
    };

    return (
        <div className="mtop container-home">
            hello
        </div>
    );
};

export default Home;
