import {CreateSlice , createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from '../api/baseUrl';

 const Fetchtodo=createAsyncThunk(
    "fetchtodo/gettodo", async () =>{
        const response = await api.get("/users");
        return response.data;
    }
 )
const intialstate={
    todo:[],
    loading:false,
    error:null
}
const todolistSlice=createSlice({
    name:"todolist",
    initialState:intialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(Fetchtodo.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(Fetchtodo.fulfilled,(state,action)=>{
            state.loading=false;
            state.todo=action.payload;
        })
        .addCase(Fetchtodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export default todolistSlice.reducer;