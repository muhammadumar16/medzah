import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from "./entities";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "entities",
  storage,
};

const reducers = combineReducers({
  entities: entitiesReducer,
});

export default persistReducer(persistConfig, reducers);
