import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { request } from "../utils/request";

const initialState = {
  files:[],
  formValue: [],
}

export const setFile = createAsyncThunk("form/setFile", async (fileName) => {
  return await request(`${API_URL}/platform-api/v1/submission-proxy/pre-signed-url/?filename=${fileName}`, null, 'GET' );
});

const formSlice = createSlice({
  name: "RootReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(setFile.fulfilled, (state, action) => {
          console.log(action)
         })

        .addCase(setFile.rejected, (state, action) => {
          console.log(action)

        })

  },
});

const { reducer } = formSlice;

export default reducer;