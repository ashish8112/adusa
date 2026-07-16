import { createContext, useContext, useState} from "react";
import API from "../../api/axios"
const AuthContext = createContext();
export default function AuthProvider({children})
{
    const [user,setUser] = useState(()=>{
        const saved = localStorage.getItem("adusaUser");
        if(saved){
            const parsedUser = JSON.parse(saved);
            // will use connectSocket for connection.
            return parsedUser;
        }
        return null;
    })
    async function register({name,email,password}) {
        const {data} = await API.post("/auth/register",{name,email,password});
        return data;
    }

    async function login({email,password}) {
        const {data} = await API.post("/auth/users/login",{email,password})
        setUser(data);
        localStorage.setItem("adusaUser",JSON.stringify(data));
        return data;
    }
    
    async function logout(){
        localStorage.removeItem("adusaUser");
        setUser(null);
        //to disconnect socket
    }
    return (
        <AuthContext.Provider value={{user,login,register,logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}