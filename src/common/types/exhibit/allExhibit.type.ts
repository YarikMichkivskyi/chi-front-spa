export type AllExhibit = {
    id: number
    imageUrl: string
    description: string
    user: {
        id: number
        username: string
    }
    commentCount: number
    createdAt: string
}