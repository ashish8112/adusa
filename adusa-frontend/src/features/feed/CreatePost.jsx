import { useState } from "react";
import API from "../../api/axios"
export default function CreatePost(){ //This will be protected Route
    const [isOpen , setIsOpen]=useState(false);

    const [content,setContent] = useState("");
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const {data} = await API.post("/posts",{content});
            setIsOpen(false);
        }
        catch(err)
        {
             alert(err.response?.data?.message||"Failed to Post");
        }
    }
    return(
        <div className="">
            <button onClick={()=>setIsOpen(true)}>Create Post </button>
        
        {isOpen&&(
            <div className="" onClick={()=>setIsOpen(false)}>
                <div className="" onClick={(e)=>e.stopPropagation()}>
                    <div className="">
                    <h3>Create Post</h3>
                    <button onClick={()=>setIsOpen(false)}>Close</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="body">body</label>
                            <textarea
                                id="body"
                                onChange={(e)=>setContent(e.target.value)}
                            />
                        </div>
                        <div>
                            <button>Cancel</button>
                            <button type="submit">Post</button>
                        </div>
                    </form>

                </div>
                
            </div>
        )}
        </div>
    )
}