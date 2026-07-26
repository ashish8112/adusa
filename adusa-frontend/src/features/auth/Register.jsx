import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "./AuthProvider";
import { useState } from "react"
import {Link} from "react-router-dom"
export default function Register(){
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })
    const {register} = useAuth();
    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.name||!formData.email||!formData.password)
            return alert("Please Enter all required filed");
        try{
            const data = await register(formData);
            return alert("Signup Succesfully"||data);
        }
        catch(err){
            return alert(err.response?.data?.message||"Failed to register Try again!");
        }
    }
     function handleChange(e) {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <div className="h-dvh bg-bg ">
            <main className="py-6 px-4 h-full w-full flex flex-col capitalize">
                <header className="mb-20 ">
                <h1 className="text-primary font-bold text-xl">Adusa</h1>
                </header>
                <h2 className="px-4 py-6 text-center font-medium text-text text-md md:text-2xl"><span>Join Adusa now - connect for productivity!</span></h2>
                <div className="rounded-xl mx-auto max-w-70 md:max-w-100  w-full bg-surface border border-border "> 
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    <Input label="name" id="name" name="name" type="text" placeholder="" value={formData.name} onChange={handleChange}></Input>
                    <Input label="email" id="email" name="email" type="email" placeholder="" value={formData.email} onChange={handleChange}></Input>
                    <Input label="password" id="password" name="password" type="password" placeholder="" value={formData.password} onChange={handleChange}></Input>
                    <Button variant="primary" type="submit">Join</Button>
                    <p className="text-muted text-center mr-0.5">Already have an account? <Link to ="/login" className="text-primary">Login</Link> </p>
                </form>
                </div>
            </main>
        </div>
    )
}