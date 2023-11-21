import { createSlice } from "@reduxjs/toolkit";

import { IUserSlice } from "../types/types";

const initialState: IUserSlice = {
  user: undefined,
  isLoading: true,
  note: {
    title: '',
    description: '',
    id: 0,
    typeOfNote: undefined,
    date: new Date().toISOString()
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.user = action.payload
    },
    logoutUser: (state) => {
      state.user = null
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;

    }
  }
})

export const { updateUserProfile, logoutUser, setLoading, setNote } = userSlice.actions
export default userSlice.reducer