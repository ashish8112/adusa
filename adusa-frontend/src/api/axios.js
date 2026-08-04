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

API.interceptors.response.use((response)=>response,(error)=>{
     if (!error.response) {
      console.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }
   const {status,data} = error.response;
   switch(status){
    case 401:
        if(error.config.url==="/auth/login")
        {
            return Promise.reject(error);
        }
        console.warn("Session Expired or Invalid Token");
        localStorage.removeItem("adusaUser");
        window.location.href="/login?expired=true";
        break;
    case 500:
        console.error(data?.message||"Something went Wrong on the Sever");
        break;
    default :
        console.error(`${status}: `,data?.message||"An error Occured ")
   }
   return Promise.reject(error) //because catch will catch this as Promise is Rejected like await use for promise if it failed .catch which catch of that block will be executed
})

export default API;