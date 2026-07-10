import axios from "axios"
const API = axios.create({baseURL:import.meta.env.VITE_API_URL || "http://localhost:3000/api"})

API.interceptors.request.use((config)=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user?.token)
        return config.headers.Authorization = `Bearer ${user.token}`
    return config;
})

return API;