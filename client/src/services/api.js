import axios from "axios";

const JOB_API_END_POINT = "http://localhost:5000/api/v1";

const api = axios.create({
    baseURL: JOB_API_END_POINT,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
