import axios from "axios";
import { useSnack } from "../providers/SnackbarProvider";

const useAxiosInterceptors = () => {
  const snack = useSnack();
  axios.interceptors.response.use(
    (data) => {
      console.log(data);

      snack("success", data.statusText);
      return Promise.resolve(data);
    },
    (error) => {
      if (error.message) snack("error", error.message);
      return Promise.reject(error);
    }
  );
};
export default useAxiosInterceptors;
