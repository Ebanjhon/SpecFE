const UserReducer = (user, action) => {
    switch (action.type) {
        case "login": {
            return action.payload;
        }
        case "logout": {
            sessionStorage.clear();
            return null;
        }
    }

    return user;
}

export default UserReducer