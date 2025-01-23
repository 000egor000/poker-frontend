import { useEffect } from "react";
import { useAppDispatch } from "@hooks/redux";
import { useUsersControllerGetUserProfileQuery } from "@store/users/endpoints";
import { setUser } from "@store/users/reducer";

const useFetchAndUpdateUser = () => {
  const { refetch } = useUsersControllerGetUserProfileQuery();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (data) {
  //     console.log("get data when refetch = ", data);
  //     dispatch(setUser({ user: data }));
  //   }
  // }, [data, dispatch]);

  const refetchData = async () => {
    const { data } = await refetch();
    if (data) {
      dispatch(setUser({ user: data }));
    }
  };

  return () => {
    refetchData(); // Вызываем refetch для обновления данных
  };
};

export default useFetchAndUpdateUser;
