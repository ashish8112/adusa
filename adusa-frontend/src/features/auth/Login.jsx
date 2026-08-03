import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
export default function Login(){
    const [formData,setFormData] = useState({
        "email":"",
        "password":""
    })
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
        <div className="h-dvh bg-bg text-text">
            <main className="py-6 px-4 h-full w-full flex flex-col capitalize">
                <header className="mb-20 ">
                <h1 className="text-primary font-bold text-xl">Adusa</h1>
                </header>
                <div className="rounded-xl mx-auto max-w-70 md:max-w-100 w-full bg-surface border border-border">
                    <header className="flex flex-col px-4 py-6 space-y-0.5">
                        <h2 className=" font-medium text-text text-md md:text-xl">Sign in</h2>
                        <p className="text-sm">New to Adusa? <Link to="/register" className="text-primary ml-0.5">Join now</Link></p>
                    </header>
                    <form onSubmit={handleSubmit} className="px-6 py-4">
                         <Input label="email" name="email" type="email" value={formData.email} onChange={handleChange} id="email"></Input>
                         <Input label="password" name="password" type="password" value={formData.password} onChange={handleChange} id="password"></Input>
                        <Button variant="primary" type="submit">Sign in</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}