import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@states/store';

interface UserState {
  user: any;
  isVegMode: boolean;
  userlocation: string;
}

const initialState: UserState = {
  user: {},
  isVegMode: false,
  userlocation: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    setVegMode: (state, action: PayloadAction<boolean>) => {
      state.isVegMode = action.payload;
    },
    setLoaction: (state, action: PayloadAction<string>) => {
      state.userlocation = action.payload;
    },
  },
});

export const {setUser, setVegMode, setLoaction} = userSlice.actions;

export const selectUser = (state: RootState) => state.user?.user;

export default userSlice.reducer;
