import { useAtom } from "jotai"
import { stateAtom } from "../jotai"
import { useParams } from "react-router-dom"
import { MarkdownView } from "../components/MarkdownView"


export default function ViewPost() {
    const [appState] = useAtom(stateAtom)
    const { id } = useParams();
    let post = appState.posts.find((p) => p.id === id)

    return (
        <main className="flex flex-col items-center">
            <div className="w-[min(100%,800px)] pt-5">
                {
                    post ? (
                        <div className="w-full">
                            <MarkdownView title={post.title} body={post.body} />
                        </div>
                    ) : (
                        <h1 className="text-7xl text-gray-700 font-bold">POST NOT FOUND</h1>
                    )
                }
            </div>
        </main>
    )
}