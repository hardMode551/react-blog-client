import { configureStore } from '@reduxjs/toolkit';
import posts from './slices//Posts/posts';
import tags from './slices/Posts/tags';
import auth from './slices/Auth';

export default configureStore({
  reducer: { posts, tags, auth },
});
