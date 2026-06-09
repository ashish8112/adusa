import {useState} from "react"
export default function Login()
{
    const[formData,setFormData]=useState({
        email:"",
        password:""
    });
    function handleSubmit(e){
        e.preventDefault(); {/* Stop Reloading of file*/}
    if(!formData.email||!formData.password)
    {
        alert("Please fill all field")
        return 
    }
        console.log(formData)
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