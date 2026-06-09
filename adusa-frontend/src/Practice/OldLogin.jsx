import {useState} from "react"
export default function Login()
{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    function handleSubmit(e){
        e.preventDefault(); {/* Stop Reloading of file*/}
        console.log({email,password})
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="user-email">Enter the Email</label> {/*not for because reserverd keyword of js for loop */}
            <br/>
            <input
                type="text"
                placeholder="Email"
                id="user-email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>
            <label htmlFor="user-password">Enter </label>
            <br/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                id="user-password"
            />
            <br/>
            <button type="submit">submit</button>
        </form>
    )
}