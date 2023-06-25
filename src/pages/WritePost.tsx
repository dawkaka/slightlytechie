import { useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as Form from '@radix-ui/react-form';
import { FontBoldIcon, FontItalicIcon, HeadingIcon, Link1Icon, QuoteIcon, CodeIcon, ImageIcon, ListBulletIcon } from '@radix-ui/react-icons';
import OrderedListIcon from "../assets/orderedList.svg"
import CodeLineIcon from "../assets/code.svg"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function WritePost() {
    const [view, setView] = useState<"edit" | "view">("edit")
    const [postBody, setPostBody] = useState(``)
    const [title, setTitle] = useState("")
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
                <div className="w-full bg-white mt-6">
                    {
                        view === "edit" && <PostEditor postBody={postBody} setPostBody={setPostBody} title={title} setTitle={setTitle} />
                    }
                    {
                        view === "view" && <MarkdownView body={postBody} title={title} />
                    }
                </div>
            </div>
        </main>
    )
}


function MarkdownView({ body, title }: { body: string, title: string }) {

    return (
        <div className="w-full p-6 bg-white mt-6" style={{ width: "100%", maxHeight: "70vh", overflow: "auto" }}>
            <h1 className="text-6xl mb-10 font-bold">{title}</h1>
            <hr />
            <div className="prose" style={{ marginTop: "50px" }}>
                <ReactMarkdown
                    children={body}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(/\n$/, '')}
                                    style={oneLight}
                                    language={match[1]}
                                    PreTag="div"
                                />
                            ) : (
                                <code {...props} className={className}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />

            </div>
        </div>
    )
}

interface PostEditorProps {
    postBody: string,
    setPostBody: (v: string) => void,
    title: string,
    setTitle: (v: string) => void
}

function PostEditor({ postBody, setPostBody, title, setTitle }: PostEditorProps) {
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const insertMarkdownElement = (type: "bold" | "italic" | "code" | "code_block" | "image" | "link" | "heading" | "quote" | "ord_list" | "unord_list") => {
        if (bodyRef.current) {
            const start = bodyRef.current.selectionStart;
            const end = bodyRef.current.selectionEnd;
            const selectedText = bodyRef.current.value.substring(start, end);
            let value = postBody
            switch (type) {
                case "bold":
                    value = bodyRef.current.value.substring(0, start) + "**" + selectedText + "**" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "italic":
                    value = bodyRef.current.value.substring(0, start) + "*" + selectedText + "*" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "code":
                    value = bodyRef.current.value.substring(0, start) + "`" + selectedText + "`" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "code_block":
                    value = bodyRef.current.value.substring(0, start) + "```\n" + selectedText + "\n```" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "link":
                    value = bodyRef.current.value.substring(0, start) + "[" + selectedText + "]" + "()" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "heading":
                    value = bodyRef.current.value.substring(0, start) + "#" + selectedText + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "quote":
                    value = bodyRef.current.value.substring(0, start) + "\n|>" + selectedText + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "unord_list":
                    value = bodyRef.current.value.substring(0, start) + "\n-" + selectedText + "\n```" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "ord_list":
                    value = bodyRef.current.value.substring(0, start) + "\n1." + selectedText + "\n```" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "image":
                    value = bodyRef.current.value.substring(0, start) + "\n![Image description](image url)" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                default:
                    console.log("unsupported type")
            }
        }
    }

    return (
        <div className="w-full p-6 bg-white mt-6" >
            <Form.Root className="" onSubmit={(e) => {
                e.preventDefault()
            }}>
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Control>
                </Form.Field >
                <div className="bg-gray-100 flex items-center gap-5 justify-center w-full p-2">
                    <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("bold")} />
                    <FontItalicIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("italic")} />
                    <Link1Icon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("link")} />
                    <HeadingIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("heading")} />
                    <QuoteIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("quote")} />
                    <img src={CodeLineIcon} height={35} width={35} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("code")} />
                    <CodeIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("code_block")} />
                    <img src={OrderedListIcon} height={35} width={35} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("ord_list")} />
                    <ListBulletIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("unord_list")} />
                    <ImageIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("image")} />

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
                            ref={bodyRef}
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
        </div>
    )
}
