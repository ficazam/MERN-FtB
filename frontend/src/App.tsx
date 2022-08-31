import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header, PrivateRoute } from "./components";
import { Register, Login, Home, NewTicket, TicketList, SingleTicket } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<TicketList />} />
            </Route>

            <Route path="/tickets/:id" element={<PrivateRoute />}>
              <Route path="/tickets/:id" element={<SingleTicket />} />
            </Route>

            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
