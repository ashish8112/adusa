import { getInitials } from "../utils/getInitials"
import { timeAgo } from "../utils/timeAgo"
export default function PostCard({post}){
return(
    <section className="bg-surface border-t border-muted border-b w-full px-2 text-text">
        <header className="flex justify-start gap-1 p-1.5 ">
            {post?.author?.avatar?<img className="h-6 w-6 rounded-full" src={post.author.avatar} alt={post.author.name}/> :<p>{getInitials(post.author?.name)}</p>}
            <p> 
            {post.author?.name}
            </p>
            <p className="text-muted text-sm before:content-['.'] before:mr-1">
            {timeAgo(post.createdAt)}
            </p>
        </header>
        <article className="w-full bg-bg flex flex-col rounded-lg">
            <p>{post.content}</p>
        </article>
        <footer>
            <span>{post.likes.length} likes</span>
        </footer>
    </section>
)
}