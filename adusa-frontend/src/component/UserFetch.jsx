import { useEffect,useState } from "react";

useEffect(() => {
  async function getUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    setUsers(data)
  }
  getUsers()
}, [])

     return(
        <div>
            {users.map((user)=>(
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
     )


