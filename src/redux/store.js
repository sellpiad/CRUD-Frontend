import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, REGISTER, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenSlice from "./tokenSlice";

const reducers = combineReducers({
    accessToken:tokenSlice
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig,reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER,PERSIST],
      },
    })
})