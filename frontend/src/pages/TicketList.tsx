import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { getTickets, reset } from '../features/tickets/ticketSlice'

import { Spinner, Back, TicketItem } from '../components'

export const TicketList = () => {
  const { tickets, isLoading, isSuccess } = useSelector((state: RootState) => state.tickets)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTickets('user'))
  }, [dispatch])

  useEffect(() => {
    return () => {
      if(isSuccess) dispatch(reset())
    }
  }, [dispatch, isSuccess])

  if(isLoading) return <Spinner />

  if(!tickets || tickets.length === 0) return <h1>No Tickets</h1>

  return (
    <>
      <Back url='/' />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map(ticket => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}
