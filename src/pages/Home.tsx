import { useAtom } from "jotai"
import { stateAtom } from "../jotai"
import Post from "../components/Post"
import { Link } from "react-router-dom"

const HomePage = () => {
    const [appState] = useAtom(stateAtom)
    let posts = appState.posts
    posts = posts.map(p => { return { ...p } }).reverse()

    return (
        <main className="flex flex-col items-center">
            <div className="px-4 w-[min(100%,1000px)] pt-5 space-y-10">
                <div className="flex gap-4 flex-col md:flex-row items-center justify-between py-4 sm:py-16">
                    <h3 className="text-6xl max-w-xl font-bold text-gray-600 w-full">Hello, I'm <span className="block text-violet-600">{appState.profile.name}</span> and well come to my blog</h3>
                    <img src={appState.profile.image} className="object-cover rounded-lg" style={{ height: "400px", width: "500px", objectFit: "cover" }} />
                </div>
                <hr />
                <h3 className="text-2xl font-medium">New</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {
                        posts.map(post => <Post post={post} key={post.id} />)
                    }
                </div>
                <div className="flex justify-center">
                    <Link to="/all-posts" className="bg-violet-700 hover:bg-violet-500 text-white w-32 py-2 w-full text-center ">
                        View All
                    </Link>
                </div>
            </div>
        </main>
    )
}


export default HomePage