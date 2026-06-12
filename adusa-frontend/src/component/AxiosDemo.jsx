import {useState,useEffect} from "react"
import axios from "axios"
import CreatePost from "./CreatePost";
export default function AxiosDemo(){
const [user,setUser] =  useState(null);
useEffect(()=>{     // we must not write async directly to callback function because useEffect need cleanup function not promise and as we know async return promise ex promise{<pending>}
    async function fetchUser(url) {
        try{
            const res = await axios.get(url)
            setUser(res.data)  //already converted to js object not need to manually convert in json string into object like fetch res.json()
        }
        catch(err){
            console.error(err.message);
        }
    }
        fetchUser("http://localhost:3000/api/auth/users");
},[])
    if(!user)
        return <p>Loading....</p>
    return (
        <div>
    <ul>{user.map((us)=>(
        <li key={us._id}>{us.name}-{us.email}</li>
    ))}</ul>
    <CreatePost/>
    </div>
    )
}