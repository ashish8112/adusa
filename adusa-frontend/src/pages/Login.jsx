import { useNavigate } from "react-router-dom"
export default function Login()
{
    const navigate = useNavigate();
    return(
        <div>
            <h1>Welcome to Login Page</h1>
            <button onClick={()=>navigate("/")}>Logout</button>
        </div>
        
    )
}