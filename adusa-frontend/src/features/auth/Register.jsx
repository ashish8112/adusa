import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "./AuthProvider";
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
export default function Register(){
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })
    const navigate = useNavigate();
    const {register,login} = useAuth();
    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.name||!formData.email||!formData.password)
            return alert("Please Enter all required filed");
        try{
            const data = await register(formData);
            await login(formData);
            alert("Registered Succesfully");
            navigate("/");
        }
        catch(err){
            return alert(err.response?.data?.message||"Failed to register Try again!");
        }
    }
     function handleChange(e) {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <div className=" bg-bg text-text flex items-center justify-center">
            <main className="py-6 px-4 w-full flex flex-col">
                <h2 className="px-4 py-6 text-center font-medium text-text text-base md:text-2xl"><span>Join Adusa now - connect for productivity!</span></h2>
                <div className="rounded-xl mx-auto max-w-70 md:max-w-100  w-full bg-surface border border-border "> 
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-2">
                    <Input label="name" id="name" name="name" type="text" placeholder="" value={formData.name} onChange={handleChange} required/>
                    <Input label="email" id="email" name="email" type="email" placeholder="" value={formData.email} onChange={handleChange} required/>
                    <Input label="password" id="password" name="password" type="password" placeholder="" value={formData.password} onChange={handleChange} required/>
                    <div className="my-5">
                        <Button variant="primary" type="submit" fullWidth={true}>Join</Button>
                    </div>
                    <p className="text-muted text-center mr-0.5">Already have an account? <Link to ="/login" className="text-primary">Login</Link> </p>
                </form>
                </div>
            </main>
        </div>
    )
}