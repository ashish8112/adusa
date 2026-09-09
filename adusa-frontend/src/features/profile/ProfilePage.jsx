import { useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import API from "../../api/axios"
import { getInitials } from "../../utils/getInitials";
import Button from "../../components/Button";
import PostCard from "../../components/PostCard";
import EditProfileModal from "./EditProfileModal";

export default function ProfilePage(){
    const [loading,setLoading] = useState(true);
    const [error ,setError] = useState(null);
    const [userDetail,setUserDetail] = useState(null);
    const [posts,setPosts] = useState([]);
    const {user} = useAuth();
    const {id} = useParams(); //read from url
    const [openEditDetails,setOpenEditDetails] = useState(false);

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
        return (
        <div className="flex min-h-60 items-center justify-center text-muted">
            loading profile...
        </div>
    );

    if(error){
        return( 
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-error">{error}</p>
            </div>
        );
    }
    const isOwnProfile = user?.id === id;
    return(
        <div className="text-text">
        {openEditDetails && 
            <EditProfileModal 
                setOpenEditDetails={setOpenEditDetails} 
                setUserDetail={setUserDetail} 
                userDetail={userDetail}
            />
        }

        <main className="max-w-2xl mx-auto w-full px-4 py-6">

        <header className="rounded-xl border border-border p-5">

            <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-4">
                    {userDetail?.avatar ? ( 
                    <img 
                        className="h-20 w-20 shrink-0 rounded-full border border-border object-cover" 
                        src={userDetail.avatar} 
                        alt={userDetail?.name}
                    />
                    ) : (
                    <p className="flex h-20 w-20  shrink-0 items-center justify-center rounded-full border border-border text-xl font-semibold"> 
                        {getInitials(userDetail?.name)}
                    </p>
                    )}

                    <div className="min-w-0">
                        <h1 className ="truncate text-xl font-bold">
                            {userDetail?.name}
                        </h1>

                        <p className="mt-1 text-sm text-muted">
                            {userDetail.college}
                        </p>
                    </div>
                </div>

                {isOwnProfile && (
                    <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={()=>setOpenEditDetails(true)}
                    >
                        Edit Profile
                    </Button> 
                )}
            </div>
            
            <div className="mt-6 border-t border-border pt-5">
                <h2 className="text-sm font-semibold">
                    About
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                    {userDetail?.bio
                        ? userDetail.bio
                        : isOwnProfile 
                            ? "Write Something about yourself."
                            : "No about section available."}
                </p>
            </div>
        </header>

        <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">
                Posts
            </h2>
            
            {posts.length===0 ?(
                <div className="rounded-xl border border-border bg-surface p-8 text-center">
                    <p className="text-sm text-muted">
                        No posts yet!
                    </p>
                </div>
            ):(
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            updatePost={setPosts}
                        />
                    ))}
                </div>
            )}
        </section>
        </main>
        </div>
    );   
}   