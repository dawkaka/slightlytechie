import { useCallback, useEffect, useState } from "react"
import { useAtom } from "jotai";
import { stateAtom } from "../jotai"
import { MarkdownView } from "../components/MarkdownView";
import { PostEditor } from "../components/PostEditor";
import { useParams } from "react-router-dom";
import ToastD from "../components/Toast";

export default function UpdatePost() {
    const [appState, setAppState] = useAtom(stateAtom)
    const [view, setView] = useState<"edit" | "view">("edit")
    const [postBody, setPostBody] = useState(``)
    const [title, setTitle] = useState("")
    const active = "w-[90px] text-violet11 border-b border-b-2 border-violet11"
    const norm = "w-[90px] hover:text-violet11"
    const [open, setOpen] = useState(false)
    const { id } = useParams();
    let post = appState.posts.find((p) => p.id === id)

    useEffect(() => {
        setTitle(post?.title || "");
        setPostBody(post?.body || "");
    }, [post]);

    const savePost = useCallback(() => {
        let posts = appState.posts.map((p) => {
            if (p.id === id) {
                return { ...p, title: title, body: postBody }
            }
            return p
        })
        setAppState({ ...appState, posts })
        setOpen(true)
    }, [title, postBody])


    return (
        <main className="w-full bg-gray-100 h-full flex flex-col items-center px-4 py-6">
            <div className="w-[min(100%,800px)]">
                {
                    post ? (
                        <>
                            <div className="flex w-full justify-between items-center">
                                <h1 className="text-3xl font-bold">Update Post</h1>
                                <div className="flex gap-10">
                                    <button onClick={() => setView("edit")} className={view === "edit" ? active : norm}>Edit</button>
                                    <button onClick={() => setView("view")} className={view === "view" ? active : norm}>Preview</button>
                                </div>
                            </div>
                            <div className="w-full bg-white mt-6">
                                {
                                    view === "edit" && <PostEditor action="Update post" postBody={postBody} setPostBody={setPostBody} title={title} setTitle={setTitle} save={savePost} />
                                }
                                {
                                    view === "view" && <div className="h-[70vh] overflow-auto w-full"><MarkdownView body={postBody} title={title} /></div>
                                }
                            </div>
                        </>) :
                        <h3 className="text-5xl font-bold text-gray-700">POST NOT FOUND</h3>
                }
                <ToastD open={open} setOpen={setOpen} title="Post updated" description="Post updated successfully!" />
            </div>
        </main>
    )
}


