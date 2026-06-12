import axios from "axios"
export default function CreatePost(){
    async function handleCreate(){
        const url = "https://jsonplaceholder.typicode.com/posts"
        const postData = {
            title:"Adusa",
            body:"College Network",
            userId:1
        }
        const res = await axios.post(url,postData);
        console.log(res.data);
    }
    return (
        <button onClick={handleCreate}>Create Post</button>
    )
}