import { PostType } from "../types"
import goBlog from "./content/go.md?raw"
import ex from "./content/examp.md?raw"

export const defalutPosts: PostType[] = [
    {
        title: "Go arrays and slices a deep dive",
        body: goBlog,
        cover: "/pic1.webp",
        id: "post1"
    },
    {
        title: "Post with all markdown and stuff",
        body: ex,
        cover: "/pic2.webp",
        id: "post2"
    },
    {
        title: "Post 3",
        body: `### Sub-subheading

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.

- Bullet point 1
- Bullet point 2
- Bullet point 3

![Cover Image](https://example.com/cover3.jpg)`,
        cover: "/pic3.jpeg",
        id: "post3"
    }
];
