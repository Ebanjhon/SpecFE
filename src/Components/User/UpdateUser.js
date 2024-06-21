import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Configs/Contexts';
import { useNavigate } from 'react-router-dom';
import { authApi, endpoints } from '../../Configs/APIs';
const UpdateUser = () => {
    const [userCurrent, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const u = await authApi().get(endpoints['current-user']);
                sessionStorage.setItem('user', JSON.stringify(u.data));
                dispatch({
                    type: 'login',
                    payload: u.data
                });
            } catch (error) {
                // Handle errors, e.g., log them or set an error state
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData(); // Call the async function immediately
    }, [])

    useEffect(() => {
        navigate("/");
    }, [userCurrent])

    return (
        <div>

        </div>
    )
}

export default UpdateUser
