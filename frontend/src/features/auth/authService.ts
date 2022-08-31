import axios from "axios";
import { UserType } from "../../types";

const API_URL: string = "/api/users";

//register
const register = async (userData: UserType) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login
const login = async (userData: UserType) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout
const logout = () => {
  localStorage.removeItem("user");
};

export const authService = { register, login, logout };
