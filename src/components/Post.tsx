import { Link } from "react-router-dom";
import { PostType } from "../../types";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Toast from '@radix-ui/react-toast';
import { useState } from "react";
import { useAtom } from "jotai";
import { stateAtom } from "../jotai";


export default function Post({ post }: { post: PostType }) {
    const { cover, title, id } = post
    return (
        <article className="border rounded-lg max-w-3xl">
            <img
                className="w-full object-cover"
                src={"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"}
                alt="post cover" />
            <div className="px-2 py-4">
                <Link to={`/post/${id}`}>
                    <h3 className="text-xl font-semibold underline hover:text-violet11">{title}</h3>
                </Link>
                <div className="flex justify-end gap-4 mt-10">
                    <Link to={`/update/${id}`}>
                        <button className="px-2 py-1 rounded-lg bg-green-400 text-white hover:bg-green-600">Update</button>
                    </Link>
                    <DeleteDialog id={id} />
                </div>
            </div>
        </article>
    )
}


function DeleteDialog({ id }: { id: string }) {
    const [appState, setAppState] = useAtom(stateAtom)
    const [open, setOpen] = useState(false)
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <button className="px-2 py-1 rounded-lg bg-red-400 text-white hover:bg-red-600">Delete</button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                            This action cannot be undone. This will permanently delete this post!
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                            <AlertDialog.Cancel asChild>
                                <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    Cancel
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button
                                    onClick={() => {
                                        const posts = appState.posts.filter(p => p.id !== id)
                                        setAppState({ ...appState, posts })
                                        setOpen(true)
                                    }}
                                    className="text-red-700 bg-red-100 hover:bg-red-300 focus:shadow-red-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    Yes, delete post
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
            <ToastD open={open} setOpen={setOpen} />
        </>
    )
}


const ToastD = ({ open, setOpen }: { open: boolean, setOpen: (b: boolean) => void }) => {

    return (
        <Toast.Provider swipeDirection="right">
            <Toast.Root
                className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate-700 text-[15px]">
                    Post deleted
                </Toast.Title>
                <Toast.Description asChild>
                    <p className="[grid-area:_description] m-0 text-slate-600 text-[13px] leading-[1.3]">Post has been deleted successfully</p>
                </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
    );
};
