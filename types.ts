export interface AppState {
    profile: { image: string, name: string },
    posts: PostType[]
    unsaved?: PostType
}

export interface PostType {
    title: string
    body: string,
    cover: string,
    id: string
}