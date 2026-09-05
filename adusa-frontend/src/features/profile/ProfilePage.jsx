import { useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import API from "../../api/axios"
import { getInitials } from "../../utils/getInitials";
import Button from "../../components/Button";
import PostCard from "../../components/PostCard";

export default function ProfilePage(){
    const [loading,setLoading] = useState(true);
    const [error ,setError] = useState(null);
    const [userDetail,setUserDetail] = useState(null);
    const [posts,setPosts] = useState([]);
    const {user} = useAuth();
    const {id} = useParams(); //read from url

    useEffect(()=>{
        async function getProfileById(){
            setLoading(true);
            setError(null);
            try{
                const {data} = await API.get(`/users/profile/${id}`);
                setUserDetail(data.user);
                setPosts(data.posts);
            }
            catch(err){
                setError(err.response?.data?.message||"Failed to get Profile");
                return;
            }
            finally{
                setLoading(false);
            }
        }
        getProfileById();
    },[id])

    if(loading)
        return (<p>Loading ... wait for few secs </p>);

    if(error)
        return <p className="text-error text-center">{error}</p>
    
    return(
    <div>
        <main className="max-w-2xl mx-auto px-2 text-text">

        <header className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    {userDetail?.avatar ? <img className="h-18 w-18 rounded-full border border-border object-cover" src={userDetail.avatar} alt={userDetail?.name}/> :
                    <p className="text-xl font-medium h-18 w-18 rounded-full border border-border flex justify-center items-center"> {getInitials(userDetail?.name)}</p>}
                </div>
                {user?.id===id && <Button type="button" variant="secondary">Edit Profile</Button> }
            </div>
            
            <div className="flex items-center gap-2">
                <p className ="text-lg font-bold text-text">{userDetail?.name}</p>
                <p className="text-muted text-xs before:content-['.'] before:mr-2">{userDetail.college}</p>
            </div>
        </header>

        <article>
            <p>About Section </p>
            {userDetail.bio ? <p>{userDetail.bio}</p> :  user?.id===id ? <p>Write Something about yourself</p> : <p>No about Section </p>}
        </article>
        
        <div className="space-y-4 mt-6">
            {(!error && posts.length===0) && (<p className="text-muted text-center">No posts Yet!</p>)}
            {posts.map((post)=>(
                <PostCard key={post._id} post={post} updatePost={setPosts}/>
            ))}
        </div>
        </main>
    </div>
    )   
}   