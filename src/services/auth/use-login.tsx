import { useMutation } from "react-query";
import { instance } from "../app.service";
import { toast } from "react-hot-toast";

export const UseLogin = () => {
  return useMutation(login, {
    onSuccess: async (data: any) => {
      const { user } = data.data;

      if (user) {
        localStorage.setItem("_user_info", JSON.stringify(data.data));
        window.location.reload();
        return;
      }
      toast.error(data.data.message);
    },
  });
};

const login = async (request: any) => {
  return instance.post("/api/login", request);
};
