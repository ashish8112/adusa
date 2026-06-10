import {useState,useEffect} from "react"
import axios from "axios"

export default function FetchVsAxios(){
    const [user,setUser] = useState(null)
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users/1")
        .then((res)=>setUser(res.data))
        .catch((err)=>console.log(err))
    },[])

  if (!user) 
    return <p>Loading...</p>
  return <h2>{user.name} — {user.email}</h2>
}