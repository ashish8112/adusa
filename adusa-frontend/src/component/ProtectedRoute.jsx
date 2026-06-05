import { Navigate } from "react-router-dom";
function ProtectedRoute({children})
{
    const token = localStorage.getItem("token")

    if(!token)
        return <Navigate to = "/login" /> // ye line react dekhtey hi turant render karta hain not like useNavigate hook jo eventHandler pe kaam karein and this is the component we need to return 
    
    return children;

}
export default ProtectedRoute;