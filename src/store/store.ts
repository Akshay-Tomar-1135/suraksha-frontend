import { configureStore } from "@reduxjs/toolkit";
import userConfigSlice from "./features/userConfig/userConfigSlice";
import userContactsReducer from "./features/userContacts/userContactsSlice"

const store = configureStore({
    reducer: {
        user: userConfigSlice,
        userContacts: userContactsReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;