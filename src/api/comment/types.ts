export interface Comment {
    comment: string
    message: number
}

export interface QueryComment {
    pageSize?: number
    pageNum?: number
    messageId:number
}

export interface ICommentApi {
    addComment: (params: Comment) => Promise<any>
    getComment: (params: QueryComment) => Promise<any>
    delComment: (id: number) => Promise<any>
}