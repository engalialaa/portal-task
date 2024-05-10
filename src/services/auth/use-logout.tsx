import {useMutation} from "react-query";
import {instance} from "../app.service";


export const UseLogout = () => {
    return useMutation(logout ,
        {
            onSuccess : () => {
                localStorage.setItem('_user_info', '');
                window.location.reload();
            }
        }
    )
}


const logout = async () => {
    return instance.post('/api/logout')
}