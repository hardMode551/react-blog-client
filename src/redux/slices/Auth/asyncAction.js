import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const fetchLogin = createAsyncThunk('posts/fetchLogin', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('posts/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});
