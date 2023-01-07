export interface Message {
    message: string
    color: number
    type: number
}

export interface QueryMessage {
    pageSize: number
    pageNum: number
    type: number
}

export interface IUserApi {
    addMessage: (params: Message) => Promise<any>
    getMessage: (params: QueryMessage) => Promise<any>
    delMessage: (id: number) => Promise<any>
}