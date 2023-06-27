import * as Form from '@radix-ui/react-form';
import { FontBoldIcon, FontItalicIcon, HeadingIcon, Link1Icon, QuoteIcon, CodeIcon, ImageIcon, ListBulletIcon } from '@radix-ui/react-icons';
import OrderedListIcon from "../assets/orderedList.svg"
import CodeLineIcon from "../assets/code.svg"
import { useRef } from "react";


interface PostEditorProps {
    postBody: string,
    setPostBody: (v: string) => void,
    title: string,
    setTitle: (v: string) => void,
    save: () => void,
    action: string
}


export function PostEditor({ postBody, setPostBody, title, setTitle, save, action }: PostEditorProps) {
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
                    value = bodyRef.current.value.substring(0, start) + "\n-" + selectedText + "\n" + bodyRef.current.value.substring(end);
                    setPostBody(value)
                    break;
                case "ord_list":
                    value = bodyRef.current.value.substring(0, start) + "\n1." + selectedText + "\n" + bodyRef.current.value.substring(end);
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
                save()
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
                <div className="bg-gray-100 flex shrink-0 overflow-x-auto items-center gap-5 px-4 md:justify-center w-full p-2">
                    <div className="shrink-0">
                        <FontBoldIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("bold")} />
                    </div>
                    <div className="shrink-0">
                        <FontItalicIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("italic")} />
                    </div>
                    <div className="shrink-0">
                        <Link1Icon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("link")} />
                    </div>
                    <div className="shrink-0">
                        <HeadingIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("heading")} />
                    </div>
                    <div className="shrink-0">
                        <QuoteIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("quote")} />
                    </div>
                    <img src={CodeLineIcon} height={35} width={35} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("code")} />
                    <div className="shrink-0">
                        <CodeIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("code_block")} />
                    </div>
                    <img src={OrderedListIcon} height={35} width={35} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("ord_list")} />
                    <div className="shrink-0">
                        <ListBulletIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("unord_list")} />
                    </div>
                    <div className="shrink-0">
                        <ImageIcon height={40} width={40} className="text-gray-600 hover:text-violet11 cursor-pointer rounded hover:bg-violet6 p-1" onClick={() => insertMarkdownElement("image")} />
                    </div>
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
                        {action}
                    </button>
                </Form.Submit>
            </Form.Root >
        </div>
    )
}
