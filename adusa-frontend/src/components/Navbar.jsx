import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import Button from "./Button";
import { getInitials } from "../utils/getInitials";

export default function Navbar(){
    const {logout,user} = useAuth();
    const navigate = useNavigate();
    return(
        <nav className="flex py-4 px-4 justify-between bg-bg sticky top-0">
            <header>
                <Link to={"/"}>
                <h1 className="text-primary font-bold text-xl">Adusa</h1>
                </Link>
            </header>
            <ul className="flex gap-4 items-center">
               {user? (
                <>
                <li>
                    <Link to={`/profile/${user.id}`}>
                        <p className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-base">{getInitials(user.name)}</p>
                    </Link>
                </li>
               <li><Button variant="primary" onClick={()=>logout()}>Logout</Button></li>
               </>
               ):(
                <>
                    <li><Button variant="secondary" onClick={()=>navigate("/login")}>Login</Button></li>
                    <li><Button variant="primary" onClick={()=>navigate("/register")}>Register</Button></li>
                </>
               )}
            </ul>
        </nav>
        )
}
