import { useCallback, useState } from "react"
import { useAtom } from "jotai";
import { stateAtom } from "../jotai"
import { PostType } from "../../types";
import { generateId } from "../utils"
import { MarkdownView } from "../components/MarkdownView";
import { PostEditor } from "../components/PostEditor";
import ToastD from "../components/Toast";

export default function WritePost() {
    const [appState, setAppState] = useAtom(stateAtom)
    const [view, setView] = useState<"edit" | "view">("edit")
    const [postBody, setPostBody] = useState(``)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const active = "w-[90px] text-violet11 border-b border-b-2 border-violet11"
    const norm = "w-[90px] hover:text-violet11"

    const savePost = useCallback(() => {
        let posts = appState.posts
        let newPost: PostType = {
            title,
            body: postBody,
            cover: "",
            id: `${title.replace(" ", "_")}_${generateId()}`
        }
        posts.push(newPost)
        setAppState({ ...appState, posts })
        setOpen(true)
    }, [title, postBody])

    return (
        <main className="w-full bg-gray-100 h-full flex flex-col items-center px-4 py-6">
            <div className="w-[min(100%,800px)]">
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-3xl font-bold">Create Post</h1>
                    <div className="flex gap-10">
                        <button onClick={() => setView("edit")} className={view === "edit" ? active : norm}>Edit</button>
                        <button onClick={() => setView("view")} className={view === "view" ? active : norm}>Preview</button>
                    </div>
                </div>
                <div className="w-full bg-white mt-6">
                    {
                        view === "edit" && <PostEditor action="Publish post" postBody={postBody} setPostBody={setPostBody} title={title} setTitle={setTitle} save={savePost} />
                    }
                    {
                        view === "view" && <div className="h-[70vh] overflow-auto w-full"><MarkdownView body={postBody} title={title} /></div>
                    }
                </div>
                <ToastD open={open} setOpen={setOpen} title="Post created" description="Post created successfully!" />
            </div>
        </main>
    )
}


