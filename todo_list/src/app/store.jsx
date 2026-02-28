import {configureStore} from "@reduxjs/toolkit";
import todoListReducer from "../feature/todolistSlice";

export const store = configureStore({
  reducer: {
    todos: todoListReducer,
  },
})