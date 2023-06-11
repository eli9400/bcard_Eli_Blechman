import axios from "axios";
import UserInterface from "../interfaces/userInterface";
import {
  LoginType,
  NormalizedEditUser,
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
export const GetUsers = async () => {
  try {
    const { data } = await axios.get<userMapToModelType[]>(`${apiUrl}/users/`);
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
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};

export const EditUser = async (normalizedUser: NormalizedEditUser) => {
  try {
    const userToServer = { ...normalizedUser };
    /*  delete userToServer._id; */
    const { data } = await axios.put<UserInterface>(
      `${apiUrl}/users/${normalizedUser._id}`,
      userToServer
    );
    console.log(data);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const ChangeBizStatus = async (userID: string) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/users/${userID}`);

    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const DeleteUser = async (userID: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userID}`);

    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
