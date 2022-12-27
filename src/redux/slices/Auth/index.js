import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchRegister, fetchAuthMe } from './asyncAction';

const initialState = {
  data: null,
  status: 'loading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //sign in
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'Error';
      state.data = null;
    });
    //fethc me
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = 'Error';
      state.data = null;
    });
    //sign up
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = 'Error';
      state.data = null;
    });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
