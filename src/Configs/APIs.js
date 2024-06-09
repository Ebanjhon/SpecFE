import axios from "axios";

const BASE_URL = 'http://localhost:8000/QuanLyDeCuong/';

export const endpoints = {
    'subjects': '/api/subjects'
}

export default axios.create({
    baseURL: BASE_URL
});