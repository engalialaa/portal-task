import {useMutation} from "react-query";
import {instance} from "../app.service";
import toast from "react-hot-toast";


export const useDelete = () => {
    return useMutation(deletePost ,
        {
            onSuccess : (data) => {
                toast.success(data?.data.message);
            }
        }
    )
}


const deletePost = async ( id : number) => {
    return instance.delete(`/api/posts/${id}`)
}