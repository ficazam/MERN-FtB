import { TicketType } from "./TicketType"

export type TicketStateType = {
    tickets: TicketType[] | void,
    ticket: TicketType,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string | any
}