import {useNavigate} from "react-router-dom"
import {useParams} from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios"
export default function Profile()
{
    const navigate = useNavigate();
    const {userId}=useParams();
    const [profile,setProfile]=useState(null);
    useEffect(()=>{
        async function fetchProfile(){
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3000/api/auth/users/${userId}`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                )
                setProfile(res.data)
            }
            catch(err)
            {
                console.error(err.response?.data?.message || err.message);
            }
        }
        fetchProfile();
    },[])
    if(!profile)
        return <p>Loading....</p>
    return (
        <div>
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
            <button onClick={()=>{localStorage.removeItem("token");navigate("/")}}>Logout</button>
        </div>     
    )
}