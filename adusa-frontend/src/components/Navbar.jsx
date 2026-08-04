import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import Button from "./Button";

export default function Navbar(){
    const {logout,user} = useAuth();
    const navigate = useNavigate();
    return(
        <nav className="flex py-6 px-4 justify-between bg-bg sticky top-0">
            <header>
                <h1 className="text-primary font-bold text-xl cursor-pointer" onClick={()=>navigate("/")}>Adusa</h1>
            </header>
            <ul className="flex gap-2">
               {user? (<li><Button variant="primary" onClick={()=>logout()}>Logout</Button></li>):(
                <>
                    <li><Button variant="secondary" onClick={()=>navigate("/login")}>Login</Button></li>
                    <li><Button variant="primary" onClick={()=>navigate("/register")}>Register</Button></li>
                </>
               )}
            </ul>
        </nav>
        )
}
