import { useEffect } from "react";
import axios from "axios";

import { useSnack } from "../providers/SnackbarProvider";
import { useUser } from "../users/providers/UserProvider";

const useAxiosInterceptors = () => {
  const snack = useSnack();
  const { token } = useUser();
  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;
    axios.interceptors.response.use((date) => {
      console.log(date);
      return Promise.resolve(date);
    }, null);
    axios.interceptors.response.use(null, (error: any) => {
      const expectedError = error.response && error.response.status >= 400;
      if (expectedError) snack("error", error.message);
      return Promise.reject(error);
    });
  }, [token, snack]);
};
export default useAxiosInterceptors;
