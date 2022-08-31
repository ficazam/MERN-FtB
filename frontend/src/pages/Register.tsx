import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { register, reset } from "../features/auth/authSlice";

import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";

import { Spinner } from '../components'
import { UserType, emptyUser } from "../types";

export const Register = () => {
  const [formData, setFormData] = useState<UserType>(emptyUser);

  const { email, name, password, password2 } = formData;
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const nav = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    //redirect after successful login
    if(user) {
      nav('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, nav, dispatch])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData: UserType = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
      setFormData(emptyUser)
    }
  };

  if(isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please, create an account</p>
      </section>

      <section className="form">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={changeHandler}
              placeholder="Enter your name."
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={changeHandler}
              placeholder="Enter your email."
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={changeHandler}
              placeholder="Enter your password."
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              value={password2}
              onChange={changeHandler}
              placeholder="Re-enter your password."
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};
