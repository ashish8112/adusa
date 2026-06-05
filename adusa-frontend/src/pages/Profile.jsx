import {useNavigate} from "react-router-dom"
import {useParams} from "react-router-dom"
export default function Profile()
{
    const navigate = useNavigate();
    const {userId}=useParams();
    return (
        <div>
            <h1>Profile Page:{userId}</h1>
            <button onClick={()=>{navigate("/")}}>Logout</button>
        </div>     
    )
}