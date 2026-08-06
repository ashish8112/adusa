import { useState,useEffect } from "react";
import API from "../../api/axios"
import PostCard from "../../components/PostCard";
import CreatePost from "./CreatePost";
export default function Feed(){
  const [loading,setLoading]= useState(true);
  const [error,setError] = useState(null);
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    async function fetchPost(){
      try{
        const {data} = await API.get("/posts");
        setPosts(data.posts);
      }
      catch(err){
        setError(err.response?.data?.message||"Failed to get Posts");
        return ;
      }
      finally{
        setLoading(false);
      }
    }
    fetchPost();
  },[])
  function handlePost(newPost){
    setPosts(prev=>[newPost,...prev]);
  }
  if(loading)
    return(<p>Loading ... wait for few secs </p>);
  return(
    <div className="bg-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
          <CreatePost onPostCreate={handlePost}/>
            <div className="mx-4 space-y-3 mt-3">
              {error&&<p className="text-error text-center">{error}</p>}
              {(!error && posts.length===0) && <p className="text-muted text-center">No posts yet</p>}
              {posts.map((post)=>(
                  <PostCard key={post._id} post={post}/>
              ))}
            </div>
      </div>
    </div>
  )
}