import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";
import { RootState, AppDispatch } from "../app/store";

import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state:RootState) => state.auth);
  
  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
    dispatch(reset());
    nav('/login');
  }

  if(user) {
    return (
      <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <button className="btn" onClick={logoutHandler}>
            <FaSignOutAlt />
            Log Out
          </button>
        </li>

      </ul>
    </header>
    )
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>
        </li>

        <li>
          <Link to="/register">
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
};
