import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Slice/authslice";
import projectReducer from "../Redux/Slice/projectslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
