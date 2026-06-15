import {useState} from "react"
import { useNavigate, Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
export default function Login()
{
    const navigate = useNavigate();
    const[formData,setFormData]=useState({
        email:"",
        password:""
    });
    async function handleSubmit(e){
        e.preventDefault(); {/* Stop Reloading of file*/}
    if(!formData.email||!formData.password)
    {
        alert("Please fill all field")
        return 
    }
        // return <Navigate to="/profile"/>  it will not run as it is event handler function not returning anything from component so we useNavigate
        try{
            const res = await axios.post("http://localhost:3000/api/auth/users/login",formData);
            console.log(res.data.token);
            localStorage.setItem("token",res.data.token);
            const decode = jwtDecode(res.data.token);
            //navigate("/profile/deocde.id"); // it will not work because it will store as string literal
            navigate(`/profile/${decode.id}`)
        }
        catch(err){
             console.error(err.response?.status+" "+err.response?.data?.message || err.message)
        }
        
    }
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value }) // why square bracket see in day 6 react note
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="user-email">Enter the Email</label> {/*not for because reserverd keyword of js for loop */}
            <br/>
            {/*it will help in e.target.name for becoming key named as email */}
            {/*name attribute e.target.name mein key ban jaata hai*/}
            <input
                type="text"
                name="email"  
                placeholder="Email"
                id="user-email"
                value={formData.email}
                onChange={handleChange}
            />
            <br/>
            <label htmlFor="user-password">Enter </label>
            <br/>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                id="user-password"
            />
            <br/>
            <button type="submit">submit</button>
        </form>
    )
}