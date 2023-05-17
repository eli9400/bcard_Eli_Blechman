import axios from "axios";
import UserInterface from "../interfaces/userInterface";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const createUser = async (user: UserInterface) => {
  try {
    const { data } = await axios.post<UserInterface>(`${apiUrl}/users`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
