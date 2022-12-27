import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchRemovePost } from './asyncActions';

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Получение постов
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'success';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'Error';
    });
    //Удаление поста
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export default postsSlice.reducer;
