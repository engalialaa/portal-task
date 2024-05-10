import {useMutation} from "react-query";
import {instance} from "../app.service";
import toast from "react-hot-toast";


export const useHide = () => {
    return useMutation(hide ,
        {
            onSuccess : (data) => {
                toast.success(data?.data.message);
            }
        }
    )
}


const hide = async ( id : number) => {
    return instance.put(`/api/posts/hide/${id}`)
}