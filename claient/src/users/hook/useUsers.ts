import { UserFromClient } from "./../models/types/userTypes";
import { useState, useMemo, useCallback } from "react";
import { useUser } from "../providers/UserProvider";
import {
  LoginType,
  NormalizedEditUser,
  TokenType,
  userMapToModelType,
} from "../models/types/userTypes";
import { EditUser, GetUser, createUser, login } from "../services/userApi";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";
import normalizeUser from "../helpers/normalizations/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeEditUser from "../helpers/normalizations/normalizeEditUser";
import UserInterface from "../interfaces/userInterface";

type ErrorType = null | string;
type UserType = null | UserInterface;
const useUsers = () => {
  const snack = useSnack();
  useAxiosInterceptors();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const { setUser, setToken, user } = useUser();
  const [userData, setUserData] = useState<UserType>(null);
  useAxiosInterceptors();
  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    user: null | TokenType,
    userData: UserType | undefined
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setUser(user);
    if (userData) setUserData(userData);
  };
  const handelGetUser = useCallback(
    async (userId: string) => {
      try {
        setLoading(false);
        const userFromClient = await GetUser(userId);
        if (userFromClient) {
          requestStatus(false, null, null, userFromClient);
          return userFromClient;
        }
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [userData]
  );
  const handelSignUp = useCallback(
    async (user: UserFromClient) => {
      try {
        setLoading(false);
        const normalizedUser = normalizeUser(user);
        const newUser = await createUser(normalizedUser);
        console.log(newUser);

        requestStatus(false, null, null, null);
        snack("success", "The user has been successfully Created");
        navigate(ROUTES.ROOT);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [user]
  );
  const handelEditUser = useCallback(
    async (user: userMapToModelType) => {
      try {
        setLoading(false);
        const normalizeUser = normalizeEditUser(user);
        const UserUp = await EditUser(normalizeUser);

        requestStatus(false, null, null, UserUp);

        snack("success", "The user has been successfully Created");

        navigate(ROUTES.ROOT);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [user]
  );
  const handleLogin = useCallback(
    async (user: LoginType) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFormLocalStorage = getUser();
        requestStatus(false, null, userFormLocalStorage, null);
        navigate(ROUTES.CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [setToken]
  );
  const handleLogOut = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const value = useMemo(() => {
    return { isLoading, error, user, userData };
  }, [isLoading, error, user, userData]);
  return {
    value,
    userData,
    handleLogin,
    handleLogOut,
    handelSignUp,
    handelEditUser,
    handelGetUser,
  };
};

export default useUsers;
