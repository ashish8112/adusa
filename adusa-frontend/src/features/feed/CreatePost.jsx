import { useRef, useState } from "react";
import API from "../../api/axios"
import Button from "../../components/Button";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
export default function CreatePost({onPostCreate}){ //This will be protected Route
    const [isOpen , setIsOpen]=useState(false);
    const [submitting,setSubmitting] = useState(false);
    const submittingRef = useRef(false);
    const {user} = useAuth();
    const [content,setContent] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        if(submittingRef.current)
            return;
        let postContent = content.trim();
        if(!postContent)
        {
            alert("Please Write Something to post");
            return ;
        }
        submittingRef.current = true;
        setSubmitting(true);
        try{
            const {data} = await API.post("/posts",{content:postContent});
            setContent("");
            setIsOpen(false);
            onPostCreate(data.post)//because data contains a lot of key and value where we need post only 
        }
        catch(err)
        {
             alert(err.response?.data?.message||"Failed to Post");
        }
        finally{
            submittingRef.current = false;
            setSubmitting(false);
        }
    }
    function handleOpen(){
        if(!user)
            return navigate("/login");
        setIsOpen(true);
    }
    return(
        <div >
        <div className="flex items-center justify-center gap-2 text-text p-4">
        {user&&<p className="h-14 w-14 rounded-full border border-border flex shrink-0 items-center justify-center self-start">{getInitials(user.name)}</p>}
        <input type="text" value ="Create a post" className="text-text text-lg outline-none bg-surface border border-border rounded-full p-3  w-full cursor-pointer hover:border-muted" onClick={handleOpen}  readOnly/>
        </div>
        {isOpen&&(
            <div className="fixed inset-0 bg-bg/80 flex justify-center items-center z-50 text-text" onClick={()=>setIsOpen(false)}>
                <div className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-border bg-surface " onClick={(e)=>e.stopPropagation()}>
                    <div className="flex justify-between items-center p-4">
                    <h3 className="text-text font-semibold text-lg">Create Post</h3>
                    <button className="cursor-pointer text-sm font-semibold" onClick={()=>setIsOpen(false)}>&times;</button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col p-4">
                        <div className="border-border border-b">
                            <textarea
                            className="text-text text-base w-full h-60 resize-none outline-none leading-relaxed"
                                id="body"
                                value={content}
                                placeholder="Share something with your network... "
                                onChange={(e)=>setContent(e.target.value)}
                            />
                        </div>
                        <div className="pt-4 self-end flex gap-2">
                            <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={submitting}>{submitting ? "Posting..." : "Post"}</Button>
                        </div>
                    </form>

                </div>
                
            </div>
        )}
        </div>
    )
}
