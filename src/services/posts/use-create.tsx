import { useMutation } from "react-query";
import { instance } from "../app.service";
import toast from "react-hot-toast";

export const useCreate = () => {
  return useMutation(create, {
    onSuccess: (data) => {
        if(data) {
          toast.success(data?.data.message);
        }
    },
  });
};

const create = async (request: any) => {
  let post = null;
  try {
     post = await instance.post("/api/posts", request);
  } catch (err:any) {
    toast.error(err.message);
  }
  return post;
};
