import {createSlice} from "@reduxjs/toolkit";
const realSlice = createSlice({
    name:"socket",
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state, action)=>{
            state.socket = action.payload;
        }
    }
});
export const {setSocket} = realSlice.actions;
export default realSlice.reducer;