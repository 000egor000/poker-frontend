import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, SetToken, SetUser } from "@store/users/types";
import { axios } from "@store/api/reducer";
import { deleteCookie, setCookie } from "cookies-next";

const initialUser = {
  id: 0,
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
  balance: 0,
};
const initialAccessToken = "";

const initialState: InitialState = {
  user:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user") ?? "{}")
      : initialUser,
  access_token:
    typeof localStorage !== "undefined"
      ? localStorage.getItem("access_token") ?? ""
      : initialAccessToken,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<SetToken>) => {
      const { access_token } = action.payload;

      localStorage.setItem("access_token", access_token);
      setCookie("accessToken", access_token);
      state.access_token = access_token;

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${action.payload.access_token}`;
    },

    setUser: (state, action: PayloadAction<SetUser>) => {
      const { user } = action.payload;

      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    logout: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      deleteCookie("accessToken");

      state.access_token = "";
      state.user = initialUser;

      axios.defaults.headers.common["Authorization"] = "";
    },
  },
});

export default userSlice.reducer;

export const { logout, setToken, setUser } = userSlice.actions;
