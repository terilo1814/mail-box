import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        email: '',
        isLoggedIn: false,
        count: 0,
        receivedMails: []
    },
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;


        },
        logout(state) {
            state.token = "";
            state.email = "";
            state.isLoggedIn = false;
        },
        setReceivedMails(state, action) {
            state.receivedMails = action.payload
            state.count = action.payload?.filter((mail) => !mail.seen).length;


        }
    }
});

const authReducer = authSlice.reducer;
export const { login, logout, setCount, setReceivedMails } = authSlice.actions;
export default authReducer;
