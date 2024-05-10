import {useMutation} from "react-query";
import {instance} from "../app.service";
import toast from "react-hot-toast";


export const useUpdate = () => {
    return useMutation(update ,
        {
            onSuccess : (data) => {
                toast.success(data?.data.message);
            }
        }
    )
}


const update = async (request : any) => {
    return instance.put(`/api/posts/${request.id}` ,request)
}