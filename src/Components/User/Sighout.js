import { useContext, useEffect } from "react";
import { UserContext } from "../../Configs/Contexts";
import { useNavigate } from "react-router-dom";

const Sighout = () => {
    const [userCurrent, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ "type": "logout" });
        sessionStorage.clear();
        navigate("/login");
    })

    return (
        <>
        </>
    )
};

export default Sighout