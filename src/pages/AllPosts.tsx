import { useAtom } from "jotai"
import { stateAtom } from "../jotai"
import Post from "../components/Post"


export default function AllPosts() {
    const [appState] = useAtom(stateAtom)
    const posts = appState.posts
    return (
        <main className="flex flex-col items-center">
            <div className="w-[min(100%,800px)] pt-5 px-2">
                <h1 className="text-4xl font-bold mb-5">My Posts</h1>
                <hr className="mb-5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {
                        posts.map(post => <Post post={post} key={post.id} />)
                    }
                </div>
            </div>
        </main>
    )
}