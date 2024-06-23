import axios from "axios";
import cookie from "react-cookies";
export const BASE_URL = 'http://localhost:8000/QuanLyDeCuong/';
export const endpoints = {
    'subjects': '/api/subjects',
    'login': '/api/login/',
    'register': '/api/users/', // Endpoint mới cho đăng ký
    'current-user': '/api/current-user/',
    'gradingsheet': `/api/gradingsheets`,
    'comment': (idSpec) => `/api/comments/spec/${idSpec}`,
    'create-comment-parent': (idSpec) => `/api/comments/spec/${idSpec}`,
    'create-comment-child': (idParent) => `/api/comments/parent/${idParent}`,
    'delete-comment': (idComment) => `/api/comment/${idComment}`,
    'get-author': (idAuthor) => `/api/author/${idAuthor}`,
    'room-chat': (iduser) => `/api/chatrooms/users?userId=${iduser}`,
    'create-specification': `/api/specifications/`,
    'create-chat-room': `/api/addchat`,
    'vn-pay': `/api/submitOrder`,
    'gradSpec': (idSpec) => `/api/specifications/listspecgrande/${idSpec}`,
    'change-pass': (iduser) => `/api/users/change-password/${iduser}`,
    'update-user': (idUser) => `/api/users/update/${idUser}`,
    'search-user-chat': (username) => `/api/searchusername?username=${username}`,
    'check-spec': (iduser, idspec) => `/api/checkUserHasSpec?userId=${iduser}&specId=${idspec}`,
    'save-spec': (iduser, idspec) => `/api/buySpec?userId=${iduser}&specId=${idspec}`,
    'get-spec-user-oder': (iduser) => `/api/specifications/getSpecsbyUser/${iduser}`,
    'delete-spec': (idspec) => `/api/specifications/${idspec}`,
    'update-spec': (idspec) => `/api/specifications/update/${idspec}`,
}

export const authApi = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': cookie.load('token')
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});