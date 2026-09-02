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
            console.error(err.response?.data?.message||"Unable to perform like or unlike action")
        }
    }
return(
    <section className="bg-surface border border-border rounded-xl text-text overflow-hidden ">
        <header className="flex items-center gap-2 px-4 py-4">
            {post?.author?.avatar?<img className="h-6 w-6 rounded-full" src={post.author.avatar} alt={post.author.name}/> :
            <p className="text-base font-medium h-10 w-10 rounded-full border  border-border flex justify-center items-center">{getInitials(post.author?.name)}</p>}
            <p className="text-base font-medium"> 
            {post.author?.name}
            </p>
            <p className="text-muted text-xs before:content-['.'] before:mr-1">
            {timeAgo(post.createdAt)}
            </p>
        </header>
        <article className=" px-4 pt-1 pb-4 ">
            <p className="text-base leading-relaxed ">{post.content}</p>
        </article>
        <footer className="px-4 py-4 border-border border-t">
             <button className={`cursor-pointer flex items-center gap-2 transition-colors duration-200 ${post?.liked ? "text-like" : "text-muted hover:text-text"}`}  onClick={toggleLike}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={post?.liked ? "currentColor" : "none"}
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="w-5 h-5"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span className="text-sm">{post?.likes?.length ?? 0}</span>
            </button>
        </footer>
    </section>
)
}
//?? Nullish Coalescing operator choose right if left is undefined or null 
// because suppose post?.views || "Not tracked"  I have written but that specific post has 0 value means 0 || "Not tracked" will render "Not tracked"
// as 0 falsy  so it is wrong here 0 should be printed 
// post?.views ?? "Not tracked" , Not tracked be only rendered if post?.views is undefined or null not in 0 
