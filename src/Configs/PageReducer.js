const PageReducer = (page, action) => {
    switch (action.type) {
        case "next": {
            return action.payload;
        }
        case "back": {
            sessionStorage.clear();
            return null;
        }
    }
    return user;
}

export default UserReducer