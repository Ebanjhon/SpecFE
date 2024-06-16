import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = 'http://localhost:8000/QuanLyDeCuong/';

export const endpoints = {
    'subjects': '/api/subjects',
    'login': '/api/login/',
    'register': '/api/users/', // Endpoint mới cho đăng ký
    'current-user': '/api/current-user/',
    'comment': (idSpec) => `/api/comments/spec/${idSpec}`,
    'create-comment-parent': (idSpec) => `/api/comments/spec/${idSpec}`,
    'create-comment-child': (idParent) => `/api/comments/parent/${idParent}`,
    'delete-comment': (idComment) => `/api/comment/${idComment}`,
    'get-author': (idAuthor) => `/api/author/${idAuthor}`,
}

console.info(cookie.load('token'))

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