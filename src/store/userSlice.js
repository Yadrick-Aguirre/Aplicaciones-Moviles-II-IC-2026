// Documentación interna: Maneja usuario y token. Persiste en AsyncStorage.
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { user: null, token: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
      AsyncStorage.setItem('token', action.payload.token);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.multiRemove(['user', 'token']);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;