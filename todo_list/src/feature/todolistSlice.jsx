import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/baseUrl";

export const fetchTodo = createAsyncThunk(
  "todolist/fetchTodo",
  async () => {
    const response = await api.get("/users");
    return response.data;
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todolistSlice.reducer;