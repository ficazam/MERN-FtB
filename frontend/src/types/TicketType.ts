export type TicketType = {
    _id?: string,
    product: string,
    description: string,
    createdAt?:string,
    updatedAt?:string,
    status?: string,
    notes?: string
}

export const emptyTicket:TicketType = {
    _id: '',
    product: "MacBook Pro",
    description: ''
}