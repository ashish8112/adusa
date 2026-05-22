import {useState , useEffect} from "react"

export default function UserFetch()
{
  const [users,setUsers]=useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  return(
    <div>
      {users.map((user)=>{
        (<p key={user.id}>{user.name}</p>)
      })}
    </div>
  )
}