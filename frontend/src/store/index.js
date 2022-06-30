import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'Auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
            localStorage.removeItem("userId");
        }
    }
});


export const AuthActions = authSlice.actions;


export const store = configureStore({
    reducer: authSlice.reducer
});
