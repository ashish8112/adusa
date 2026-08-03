import { useState,useEffect } from "react";
import API from "../../api/axios"
import PostCard from "../../components/PostCard";
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
  if(loading)
    return(<p>Loading ... wait for few secs </p>);
  else if(error)
    return(<p>{error}</p>)
  else if(posts.length===0)
    return (<p>No posts</p>)
  return(
    <div>
      {posts.map((post)=>(
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
  )
}