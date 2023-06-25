import { useState } from "react"
import * as Form from '@radix-ui/react-form';
import { FontBoldIcon, FontItalicIcon, HeadingIcon, Link1Icon, QuoteIcon, CodeIcon, ImageIcon } from '@radix-ui/react-icons';


export default function WritePost() {
    const [view, setView] = useState<"edit" | "view">("edit")
    const active = "w-[90px] text-violet11 border-b border-b-2 border-violet11"
    const norm = "w-[90px] hover:text-violet11"
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
                <div className="w-full p-6 bg-white mt-6">
                    {
                        view === "edit" ? <PostEditor /> : null
                    }
                </div>
            </div>
        </main>
    )
}



function PostEditor() {
    const [postBody, setPostBody] = useState("")
    return (
        <Form.Root className="" onSubmit={(e) => {
            e.preventDefault()
            console.log(e)
        }} onChange={() => console.log("changed")}>
            <Form.Field className="grid mb-[10px]" name="email">
                < div className="flex items-baseline justify-between" >
                    <Form.Label className="text-[15px] font-medium leading-[35px]">Title</Form.Label>
                    <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                        Please enter post title
                    </Form.Message>
                    <Form.Message className="text-[13px] opacity-[0.8]" match={(e) => { return e.length < 10 }}>
                        Title can not be less than 10 characters
                    </Form.Message>
                </div >
                <Form.Control asChild>
                    <input
                        className="box-border w-full shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                        type="text"
                        placeholder="Post Title.."
                        required
                    />
                </Form.Control>
            </Form.Field >
            <div className="bg-gray-100 flex items-center gap-5 justify-center w-full p-2">
                <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" />
                <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" />
                <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" />
                <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" />
                <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" />
                <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" />

            </div>
            <Form.Field className="grid mb-[10px]" name="question">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px]">
                        Post Body (Marddown)
                    </Form.Label>
                    <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                        Post body can not be empty
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <textarea
                        className="box-border w-full h-[500px] shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
                        required
                        placeholder="Post body..."
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild onSubmit={(e) => console.log(e)}>
                <button className="box-border text-white w-full hover:text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-violet11 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                    Publish post
                </button>
            </Form.Submit>
        </Form.Root >
    )
}
