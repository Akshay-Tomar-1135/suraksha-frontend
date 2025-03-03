import { configureStore } from "@reduxjs/toolkit";
import userConfigSlice from "./features/userConfig/userConfigSlice";

const store = configureStore({
    reducer: {
        user: userConfigSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;