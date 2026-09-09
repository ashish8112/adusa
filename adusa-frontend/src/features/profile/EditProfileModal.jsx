import { useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import API from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function EditProfileModal({setOpenEditDetails,setUserDetail,userDetail}){

    const {user,updateUser} = useAuth();
    const [formData,setFormData] = useState(userDetail)
    const [submitting,setSubmitting] = useState(false);
    const submittingRef = useRef(false);
    async function handleSubmit(e){
        e.preventDefault();
        if(submittingRef.current)
            return 
        setSubmitting(true);
        submittingRef.current=true;
        try{
            const {data} = await API.put("/users/update",formData);
            const updatedUser = {...user,name:data.user.name};
            updateUser(updatedUser);
            setUserDetail(data.user);
            setOpenEditDetails(false);
        }
        catch(err){
            return alert(err.response?.data?.message||"Update Failed");
        }
        finally{
            submittingRef.current=false;
            setSubmitting(false);
        }
    }

    function handleChange(e){
        setFormData(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }
    return (
        <div 
            className="fixed inset-0 bg-bg/80 flex justify-center items-center z-50 text-text px-4" 
        >
            <div 
                className="rounded-xl flex flex-col justify-center items-center max-w-md  w-full bg-surface border border-border p-4"
            >

                <header className="flex w-full justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        Edit Details
                    </h2>

                    <button 
                        type="button"
                        className="cursor-pointer text-xl text-muted hover:text-text" 
                        onClick={()=>setOpenEditDetails(false)}
                        aria-label="Close"
                        >
                            &times;
                    </button>
                </header>

                <form 
                    onSubmit={handleSubmit} 
                    className="mt-5 flex flex-col gap-4"
                >
                    <Input 
                        label="name" 
                        name="name" 
                        type="text" 
                        placeholder={formData.name} 
                        value={formData.name} 
                        onChange={handleChange} 
                        id="name"
                    />
                    <Input 
                        label="avatar" 
                        name="avatar" 
                        type="text" 
                        placeholder={formData.avatar} 
                        value={formData.avatar} 
                        onChange={handleChange} 
                        id="avatar" 
                    />
                    <Input 
                        label="college" 
                        name="college" 
                        type="text" 
                        placeholder={formData.college} 
                        value={formData.college} 
                        onChange={handleChange} 
                        id="college"
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="bio" className="text-muted ">
                            Bio
                        </label>

                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            className="w-full resize-none rounded-lg border border-border bg-transparent p-3 text-base outline-none leading-relaxed transition focus:border-primary"
                            rows="3"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                        <Button 
                            type="button" 
                            variant="secondary" 
                            onClick={()=>setOpenEditDetails(false)} 
                        >
                            Cancel
                        </Button>

                        <Button 
                            type="submit"  
                            disabled={submitting} 
                        >
                        {submitting?"submitting":"Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}