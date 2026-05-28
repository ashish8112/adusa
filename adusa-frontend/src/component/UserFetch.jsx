//UseState and UseEffect
import {useState , useEffect, use} from "react"

export default function UserFetch()
{
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setUsers(data)
      setLoading(false)
    })
    .catch((err)=>{
      setError("Something went wrong")
      setLoading(false)
    })
  },[])



  if(loading)
    return <p> {"loading ...."}</p>
  if(error)
    return <p>{error}</p>
  return(
    <div>
      {users.map((user)=>
         (<p key={user.id}>{user.name}</p>)
      )}
    </div>
  )
}