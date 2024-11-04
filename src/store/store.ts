// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import userReducer from '../features/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers if you have them
  },
});

// Create a typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

// Export the dispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
