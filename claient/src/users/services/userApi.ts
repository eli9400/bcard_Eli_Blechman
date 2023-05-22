import axios from "axios";
import UserInterface from "../interfaces/userInterface";
import {
  LoginType,
  NormalizedEditUser,
  TokenType,
  UserFromClient,
  userMapToModelType,
} from "../models/types/userTypes";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";
export const GetUser = async (userId: string) => {
  try {
    const { data } = await axios.get<UserInterface>(
      `${apiUrl}/users/${userId}`
    );
    if (data) return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error))
      return Promise.reject("An unexpected error occurred!");
  }
};
export const createUser = async (user: object) => {
  try {
    const { data } = await axios.post<UserInterface>(`${apiUrl}/users`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const login = async (user: LoginType) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const EditUser = async (userNormalized: NormalizedEditUser) => {
  try {
    const userToServer = { ...userNormalized };
    delete userToServer.user_id;
    const { data } = await axios.put<UserInterface>(
      `${apiUrl}/users/${userToServer.user_id}`,
      userToServer
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
