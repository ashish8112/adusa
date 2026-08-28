import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import Button from "./Button";
import { getInitials } from "../utils/getInitials";

export default function Navbar(){
    const {logout,user} = useAuth();
    const navigate = useNavigate();
    return(
        <nav className="flex py-4 px-4 justify-between bg-bg sticky top-0">
            <header>
                <h1 className="text-primary font-bold text-xl cursor-pointer" onClick={()=>navigate("/")}>Adusa</h1>
            </header>
            <ul className="flex gap-4 items-center">
               {user? (
                <>
                <li><p className="h-10 w-10 rounded-full border border-border flex items-center justify-center  text-base">{getInitials(user.name)}</p></li>
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
