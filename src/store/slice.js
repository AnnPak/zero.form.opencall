import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { request } from "../utils/request";

const initialState = {
  files: {},
  uploadStatus: {}
};

export const putFile = createAsyncThunk(
  "form/getFileUrls",
  async ({file, inputName}) => {
      const response = await request(
          `${API_URL}/platform-api/v1/submission-proxy/pre-signed-url/?filename=${file.name}`,
          null,
          "GET"
      )
      
    
      await fetch(response.pre_signed_url, {
        method: "PUT",
        body: file,
      }).then(res=> console.log(res));

      return {
        pre_signed_url: response.pre_signed_url,
        file_future_url: response.file_future_url,
        filedType: inputName,
      };
  
  }
);

const formSlice = createSlice({
  name: "RootReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putFile.pending, (state, action) => {
        const inputName = action.meta.arg.inputName;
        state.uploadStatus = state.uploadStatus
        ? {
            ...state.uploadStatus,
            [inputName]: 'loading',
          }
        : { [inputName]: 'loading' };

      })
      .addCase(putFile.fulfilled, (state, action) => {
        const { file_future_url, filedType } = action.payload;
        state.files = state.files
          ? {
              ...state.files,
              [filedType]: file_future_url,
            }
          : { [filedType]: file_future_url };

          state.uploadStatus = state.uploadStatus
          ? {
              ...state.uploadStatus,
              [filedType]: 'success',
            }
          : { [filedType]: 'success' };

          const timeOut = setTimeout(() => {
            state.uploadStatus = state.uploadStatus
            ? {
                ...state.uploadStatus,
                [filedType]: 'idle',
              }
            : { [filedType]: 'idle' };
          }, 5000)

          clearTimeout(timeOut);
      })

      .addCase(putFile.rejected, (state, action) => {
        const { filedType } = action.payload;
        state.uploadStatus = state.uploadStatus
        ? {
            ...state.uploadStatus,
            [filedType]: 'error',
          }
        : { [filedType]: 'error' };

        const timeOut = setTimeout(() => {
          state.uploadStatus = state.uploadStatus
          ? {
              ...state.uploadStatus,
              [filedType]: 'idle',
            }
          : { [filedType]: 'idle' };
        }, 5000)
        
        clearTimeout(timeOut);
      })

  },
});

const { reducer } = formSlice;

export default reducer;
