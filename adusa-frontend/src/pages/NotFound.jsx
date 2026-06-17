import {Link} from "react-router-dom"
import { Navigate } from "react-router-dom"
export default function NotFound(){
    return(
        <div>
            <h1>404 - Page Not Found </h1>
            <Link to="/">Go to Home</Link>
            {/* <Navigate to ="/login"/> */} {/*if this is in code it will always automatically redirect to login page without showing above info.*/}
        </div>
    )
}