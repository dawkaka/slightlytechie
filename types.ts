export interface AppState {
    profile: { image: string, name: string },
    posts: PostType[]
    unsaved: { title: string, body: string }
}

export interface PostType {
    title: string
    body: string,
    cover: string,
    id: string
}