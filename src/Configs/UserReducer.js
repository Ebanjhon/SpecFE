const UserReducer = (user, action) => {
    switch (action.type) {
        case "login": {
            return action.payload;
        }
        case "logout": {
            sessionStorage.clear();
            return null;
        }
        case "upstore":
            return JSON.parse(sessionStorage.getItem('user'));
    }

    return user;
}

export default UserReducer