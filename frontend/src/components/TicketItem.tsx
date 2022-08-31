import React from 'react'
import { Link } from 'react-router-dom'

import { TicketType } from '../types'

interface iProps {
    ticket: TicketType
}

export const TicketItem:React.FC<iProps> = (props) => {
  return (
    <div className="ticket">
        <div>{new Date(props.ticket.createdAt!).toLocaleString('en-US')}</div>
        <div>{props.ticket.product}</div>
        <div className={`status status-${props.ticket.status}`}>
            {props.ticket.status}
        </div>
        <Link to={`/ticket/${props.ticket._id}`} className='btn btn-sm btn-reverse'>View</Link>
    </div>
    )
}
