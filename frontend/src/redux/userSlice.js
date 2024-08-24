import  {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState : {
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        onlineUsers:null,
    },
    reducers : {
        setauthUser:(state,action) =>{
            // console.log('setauthUser action payload:', action.payload);
            state.authUser=action.payload;
            // console.log('Updated state.authUser:', state.authUser);
        },
        setotherUsers:(state,action) =>{
            state.otherUsers=action.payload;
            // console.log(state.otherUsers);
        },
        setselectedUser:(state,action) => {
            state.selectedUser=action.payload;
            // console.log(state.selectedUser);
            
        },
        setonlineUsers :(state,action) =>{
            state.onlineUsers=action.payload;
            console.log(state.onlineUsers);
        }
    }
});

export const {setauthUser,setotherUsers,setselectedUser,setonlineUsers}= userSlice.actions;
export default userSlice.reducer;