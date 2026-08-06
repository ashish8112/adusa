import { useState } from "react";
import API from "../../api/axios"
import Button from "../../components/Button";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { getInitials } from "../../utils/getInitials";
export default function CreatePost({onPostCreate}){ //This will be protected Route
    const [isOpen , setIsOpen]=useState(false);
    const {user} = useAuth();
    const [content,setContent] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const {data} = await API.post("/posts",{content});
            setIsOpen(false);
            setContent("");
            onPostCreate(data.post)//because data contains alot of key and value where we need post only 
        }
        catch(err)
        {
             alert(err.response?.data?.message||"Failed to Post");
        }
    }
    function handleOpen(){
        if(!user)
            return navigate("/login");
        setIsOpen(true);
    }
    return(
        <div className="py-4 ">
        <div className="flex items-center justify-center gap-3 text-text py-4 px-4">
        {user&&<p className="h-12 w-12 rounded-full border border-border flex items-center justify-center self-start">{getInitials(user.name)}</p>}
        <input type="text" value ="Create a post" className="text-text outline-none bg-surface border border-border rounded-full p-4 mb-4 w-full cursor-pointer" onClick={handleOpen}  readOnly/>
        </div>
        {isOpen&&(
            <div className="fixed inset-0 bg-bg/80 flex justify-center items-center p-4 z-50 text-text" onClick={()=>setIsOpen(false)}>
                <div className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-border bg-surface " onClick={(e)=>e.stopPropagation()}>
                    <div className="flex justify-between items-center p-4">
                    <h3>Create Post</h3>
                    <button className="cursor-pointer text-md" onClick={()=>setIsOpen(false)}>&times;</button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col p-4">
                        <div className="my-3  border-b">
                            <textarea
                            className="w-full h-60 resize-none outline-none"
                                id="body"
                                value={content}
                                placeholder="Share something with your network... "
                                
                                onChange={(e)=>setContent(e.target.value)}
                            />
                        </div>
                        <div className=" self-end">
                            <Button type="submit" >Post</Button>
                        </div>
                    </form>

                </div>
                
            </div>
        )}
        </div>

        //instead of top-0 , left-0 , right-0 and bottom-0 use inset-0 
        //not left-0 starting of window and right-0 end of window not both are at same location like x(0,0)
    )
}