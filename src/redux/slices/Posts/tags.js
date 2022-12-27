import { createSlice } from '@reduxjs/toolkit';
import { fetchTags } from './asyncActions';

const initialState = {
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
    //Получение тегов
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'success';
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = 'Error';
    });
  },
});

// Action creators are generated for each case reducer function
export const { posts } = postsSlice.actions;

export default postsSlice.reducer;
