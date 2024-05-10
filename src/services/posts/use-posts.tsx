import { useQuery } from "react-query";
import { instance } from "../app.service";

export const usePosts = (page = 1 , limit = 10) => {
  const response =   useQuery(["data-list" , page, limit],  () => getPosts(page, limit), {
    onSuccess: (data) => {},
  });
  return {
    ...response,
    'posts': response.data?.data.posts,
    'totalCount' : response.data?.data.totalCount
  }
};

const getPosts = async (page:number, limit:number) => {
  return instance.get(`/api/posts?page=${page}&limit=${limit}`);
};
