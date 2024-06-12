import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = 'http://localhost:8000/QuanLyDeCuong/';

export const endpoints = {
    'subjects': '/api/subjects',
    'login': '/api/login/',
    'current-user': '/api/current-user/',

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