import axios from "axios"
const API = axios.create({baseURL:import.meta.env.VITE_API_URL || "http://localhost:3000/api"})

API.interceptors.request.use((config)=>{
    try{
        const saved = localStorage.getItem("adusaUser");
        const user = saved ? JSON.parse(saved):null;
        if(user?.token)
        config.headers.Authorization = `Bearer ${user.token}`
    }
    catch(err){
        console.error("adusa User is corrupted clear it or check the problem")
    }
    return config;
})

export default API;