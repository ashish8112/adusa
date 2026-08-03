import { getInitials } from "../utils/getInitials"
import { timeAgo } from "../utils/timeAgo"
export default function PostCard({post}){
return(
    <section className="bg-surface border border-border rounded-lg max-w-96 w-full py-4 px-3 mb-4 text-text">

        <div className="flex items-center gap-3 mb-3">
            <p>{getInitials(post.author?.name)}</p>
            <p>{post.author?.name}</p>
        </div>
        <div>
            <p>{post.author?.bio}</p>
            <p>{timeAgo(post.createdAt)}</p>
        </div>

        <div>{post.content}</div>
        <span>{post.likes.length} likes</span>
    </section>
)
}