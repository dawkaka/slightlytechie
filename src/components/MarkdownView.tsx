import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'



export function MarkdownView({ body, title }: { body: string, title: string }) {

    return (
        <div className="w-full p-6 bg-white mt-6">
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