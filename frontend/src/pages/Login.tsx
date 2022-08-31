import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { login, reset } from "../features/auth/authSlice";

import { toast } from "react-toastify";

import { FaSignInAlt } from "react-icons/fa";
import { Spinner } from "../components";

import { UserType, emptyUser } from "../types";

export const Login = () => {
  const [formData, setFormData] = useState<UserType>(emptyUser);
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );
  const nav = useNavigate();

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect after successful login
    if (user) {
      nav("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, nav, dispatch]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserType = {
      email,
      password,
    };

    dispatch(login(userData));
    setFormData(emptyUser);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Welcome Back!
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={submitHandler}>
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
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};
