import useFetchData from "../hooks/userFetch"
export default function FetchUser(){
    const {loading,data,error}=useFetchData("https://jsonplaceholder.typicode.com/users") //It is calling function not component
    if(loading)
        return <p>Loading ....</p>
    if(error)
        return <p>Error:{error}</p>
    return(
        <ul>
          {data.map((user)=>{
            return <li key={user.id}>{user.name}-{user.id}</li>
          })} 
        </ul>
    )
}