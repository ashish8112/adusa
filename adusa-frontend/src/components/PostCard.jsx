import { getInitials } from "../utils/getInitials"
import { timeAgo } from "../utils/timeAgo"
import API from "../api/axios"
import { useAuth } from "../features/auth/AuthProvider"
export default function PostCard({post,updatePost}){
    const {user}= useAuth();
    async function toggleLike(){
        const previousPost = post; // only this means single post data not all 
            updatePost(prev=>prev.map(p=>{ //Imediately update before api call 
                if(p._id===post._id){ //every id is string to no need to convert anything to check 
                    const isAlreadyLiked = p.likes.includes(user.id);
                    const updatedLikes = isAlreadyLiked ?p.likes.filter(id=>id!==user.id):[...p.likes,user.id]; //...p.likes means like array all data and user.id at last in array it is only position but in object it means updating if it is in prefix and update is in last means update last value Toh update karne ke liye hamesha { ...purana, nayaField: value } and if { nayaField: value, ...purana } means last will override and changes will not seen it is not used for default values
                    return{...p,likes:updatedLikes,liked:!isAlreadyLiked};
                }
                return p;
            }))
            try{
            const {data} = await API.post(`/posts/${post._id}/like`)
            updatePost(prev=>prev.map(p=>{
                if(p._id===post._id)
                    return    ({...p,likes:data.likes,liked:data.liked})
                return p;
            }))
        }
        catch(err){
            updatePost(prev=>prev.map(p=>{ //api call fails
                if(p._id===post._id)
                    return previousPost; // send previous data this post only for that post id 
                return p;
            }))
            console.error(err.response?.data?.message||"Unable to perfrom like or unlinke action")
        }
    }
return(
    <section className="bg-surface border border-border rounded-xl px-2 text-text overflow-hidden ">
        <header className="flex items-center gap-2 py-3 px-4 ">
            {post?.author?.avatar?<img className="h-6 w-6 rounded-full" src={post.author.avatar} alt={post.author.name}/> :<p>{getInitials(post.author?.name)}</p>}
            <p> 
            {post.author?.name}
            </p>
            <p className="text-muted text-sm before:content-['.'] before:mr-1">
            {timeAgo(post.createdAt)}
            </p>
        </header>
        <article className=" pb-4 px-4">
            <p>{post.content}</p>
        </article>
        <footer className="px-4 py-3 cursor-pointer border-border border-t">
            <span>{post?.likes?.length ?? 0} <button className="cursor-pointer" onClick={toggleLike}>{(post?.liked)?"Unlike":"like"}</button></span>
        </footer>
    </section>
)
}
//?? Nullish Coalescing operator choose right if left is undefined or null 
// because suppose post?.views || "Not tracked"  I have written but that specific post has 0 value means 0 || "Not tracked" will render "Not tracked"
// as 0 falsy  so it is wrong here 0 should be printed 
// post?.views ?? "Not tracked" , Not tracked be only rendered if post?.views is undefined or null not in 0 
