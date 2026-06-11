import {useState,useEffect} from "react"
import axios from "axios"
export default function Axios(){
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
        fetchUser("https://jsonplaceholder.typicode.com/users/2");
},[])
    if(!user)
        return <p>Loading....</p>
    return <h2>{user.name}- {user.email}</h2>
}