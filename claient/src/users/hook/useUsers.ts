import { UserFromClient } from "./../models/types/userTypes";
import { useState, useMemo, useCallback } from "react";
import { useUser } from "../providers/UserProvider";
import {
  LoginType,
  TokenType,
  userMapToModelType,
} from "../models/types/userTypes";
import {
  ChangeBizStatus,
  DeleteUser,
  EditUser,
  GetUser,
  GetUsers,
  createUser,
  login,
} from "../services/userApi";
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

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const [userData, setUserData] = useState<UserType>(null);
  useAxiosInterceptors();
  const { setUser, setToken, user } = useUser();
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
          requestStatus(false, null, user, userFromClient);
          return userFromClient;
        }
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [userData]
  );
  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);

      const Users = await GetUsers();
      if (Users) return Users;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);
  const handelSignUp = useCallback(
    async (user: UserFromClient) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        const newUser = await createUser(normalizedUser);

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
    async (userFromClient: userMapToModelType) => {
      try {
        setLoading(true);
        console.log(userFromClient._id);

        const { _id, isBusiness, isAdmin, ...rest } = userFromClient;
        const user = { _id, isBusiness, isAdmin };

        const normalizeUser = normalizeEditUser(userFromClient);

        const upUser = await EditUser(normalizeUser);

        requestStatus(false, null, null, upUser);
        snack("success", "The user has been successfully updated");
        if (user.isBusiness) return navigate(ROUTES.MY_CARDS);
        navigate(ROUTES.ROOT);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [user]
  );
  /* const handleLogin = useCallback(async (user: LoginType) => {
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
  }, []); */
  const handleLogin = useCallback(async (user: LoginType): Promise<void> => {
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
      throw error; // Re-throw the error to propagate it to the caller
    }
  }, []);

  const handleLogOut = useCallback(() => {
    removeToken();
    setUser(null);
    navigate(ROUTES.ROOT);
  }, [setUser]);
  const handleChangeStatusBiz = useCallback(async (userID: string) => {
    try {
      setLoading(true);
      const biz = ChangeBizStatus(userID);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);
  const handleDeleteUser = async (userId: string) => {
    try {
      setLoading(true);
      await DeleteUser(userId);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };

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
    handleGetUsers,
    handleChangeStatusBiz,
    handleDeleteUser,
  };
};

export default useUsers;
