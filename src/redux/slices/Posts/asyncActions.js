import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const fetchPosts = createAsyncThunk('posts/FetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/FetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', (id) => {
  axios.delete(`/posts/${id}`);
});
