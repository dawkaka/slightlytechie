import { PostType } from "../types"

export const defalutPosts: PostType[] = [
    {
        title: "Post 1",
        body: `# Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at nisi augue. 

- List item 1
- List item 2
- List item 3

![Cover Image](https://example.com/cover1.jpg)`,
        cover: "/pic1.webp",
        id: "post1"
    },
    {
        title: "Post 2",
        body: `## Subheading

Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut enim ad minim veniam.

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

![Cover Image](https://example.com/cover2.jpg)`,
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
