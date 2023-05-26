import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        email: '',
        isLoggedIn: false
    },
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.email = action.payload;
            state.isLoggedIn = true;
            

        },
        logout(state) {
            state.token = "";
            state.email = "";
            state.isLoggedIn = false;
        }
    }
});

const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export default authReducer;
