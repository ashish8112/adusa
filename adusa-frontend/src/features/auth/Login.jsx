import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
export default function Login(){
    const [formData,setFormData] = useState({
        "email":"",
        "password":""
    })
    const [searchParams] = useSearchParams();
    const expired = searchParams.get("expired") //return null in default 
    const navigate = useNavigate();
    const {login} = useAuth();
    async function handleSubmit(e) {
        e.preventDefault();
        if(!formData.email||!formData.password)
            return alert("Please Enter all filed")
        try{
            await login(formData)
            alert("LoggedIn Succesfully");
            navigate("/");
        }
        catch(err){
            return alert(err.response?.data?.message||"LogIn Failed")
        }
    }
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <div className=" bg-bg text-text ">
            <main className="py-6 px-4  w-full flex flex-col capitalize">
                {expired && <p className="text-error text-sm text-center mb-2">Session Expired. Please Login Again</p>}
                <div className="rounded-xl mx-auto max-w-70 md:max-w-100 w-full bg-surface border border-border">
                    <header className="flex flex-col px-4 py-6 space-y-0.5">
                        <h2 className=" font-medium text-text text-md md:text-xl">Sign in</h2>
                        <p className="text-sm">New to Adusa? <Link to="/register" className="text-primary ml-0.5">Join now</Link></p>
                    </header>
                    <form onSubmit={handleSubmit} className="px-6 py-4 ">
                         <Input label="email" name="email" type="email" value={formData.email} onChange={handleChange} id="email" required />
                         <Input label="password" name="password" type="password" value={formData.password} onChange={handleChange} id="password" required/>
                         <div className="my-5">
                            <Button variant="primary" type="submit" fullWidth={true}>Sign in</Button>
                         </div>
                        
                    </form>
                </div>
            </main>
        </div>
    )
}