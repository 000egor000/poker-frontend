import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import modalSlice from "./modals/reducer";
import userSlice from "./users/reducer";
import apiSlice from "./api/reducer";

const reducers = combineReducers({
  modal: modalSlice,
  api: apiSlice,
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["courses"],
};

const rootReducer = reducers;
const persistedReducer = persistReducer(persistConfig, reducers);

export { persistedReducer };
export default rootReducer;
