import axios from "axios";

export const makeReqest = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true,
})