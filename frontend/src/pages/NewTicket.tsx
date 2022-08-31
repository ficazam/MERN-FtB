import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { createTicket, reset } from "../features/tickets/ticketSlice";

import { toast } from "react-toastify";

import { emptyTicket, TicketType } from "../types";
import { Spinner, Back } from "../components";

export const NewTicket = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.tickets
  );

  const dispatch = useDispatch<AppDispatch>()

  const [ticket, setTicket] = useState<TicketType>(emptyTicket);
  const nav = useNavigate();

  const { product, description } = ticket;

  useEffect(()=>{
    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      dispatch(reset())
      nav('/tickets')
    }
  },[dispatch, isError, isSuccess, nav, message])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createTicket(ticket));

    setTicket(emptyTicket);
  };

  const productHandlder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicket((prev) => ({ ...prev, product: e.target.value }));
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTicket((prev) => ({ ...prev, description: e.target.value }));
  };

  if(isLoading) return <Spinner />

  return (
    <>
    <Back url='/' />
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill the form below:</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name:</label>
          <input
            type="text"
            className="form-control"
            value={user?.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Customer Email:</label>
          <input
            type="text"
            className="form-control"
            value={user?.email}
            disabled
          />
        </div>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Product:</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={productHandlder}
            >
              <option value="MacBook Pro">MacBook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
              <option value="iPhone">iPhone</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue: </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Add a description"
              value={description}
              onChange={descriptionHandler}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit New Ticket</button>
          </div>
        </form>
      </section>
    </>
  );
};
