import { useState, useMemo, useCallback } from "react";
import { useUser } from "../providers/UserProvider";
import { LoginType, TokenType } from "../models/types/userTypes";
import { login } from "../services/userApi";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";

type ErrorType = null | string;

const useUsers = () => {
  useAxiosInterceptors();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const { setUser, setToken, user } = useUser();
  useAxiosInterceptors();
  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    user: null | TokenType
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setUser(user);
  };

  const handleLogin = useCallback(
    async (user: LoginType) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFormLocalStorage = getUser();
        requestStatus(false, null, userFormLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [setToken]
  );
  const handleLogOut = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const value = useMemo(() => {
    return { isLoading, error, user };
  }, [isLoading, error, user]);
  return { value, handleLogin, handleLogOut };
};

export default useUsers;
