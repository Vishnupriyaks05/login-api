// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState, UserUpdate } from '../types/apiTypes';

const initialState: UserState = {
  currentUser: null,
  userList: [], // Initialize userList as an empty array
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser(state, action: PayloadAction<User>) {
        state.currentUser = action.payload; // Set current user
      },
      
    clearUser(state) {
      state.currentUser = null; // Clear current user
    },

    updateUser(state, action: PayloadAction<UserUpdate>) {
        if (state.currentUser) {
          state.currentUser = { ...state.currentUser, ...action.payload }; // Update current user
        }
      },
    setUsers(state, action: PayloadAction<User[]>) {
      state.userList = action.payload; // Set the user list
    },

    clearUsers(state) {
      state.userList = []; // Clear the user list
    },
  },
});

export const { setUser, clearUser, updateUser, setUsers, clearUsers } = userSlice.actions;

export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const selectUsers = (state: { user: UserState }) => state.user.userList; // Selector for user list

export default userSlice.reducer;
