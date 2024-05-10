import {useQuery} from "react-query";
import {instance} from "../app.service";


export const  useUsers = () => {
  const {data , refetch , isLoading , isError} = useQuery('lookup-users' , userLookups , {
      onSuccess : (data ) => {
          console.log(data)
      }
  });

  return {
      users : data?.data,
      refetchUsers :refetch,
      isLoadingUsers : isLoading,
      isErrorUsers : isError
  }

}

const userLookups = async () => {
    return instance.get('api/lookups/users');
}
