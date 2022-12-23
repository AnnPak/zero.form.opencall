import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { request } from "../utils/request";

const initialState = {
  files: {},
};

export const getFileUrls = createAsyncThunk(
  "form/getFileUrls",
  async (file) => {
      const response = await request(
          `${API_URL}/platform-api/v1/submission-proxy/pre-signed-url/?filename=${file.name}`,
          null,
          "GET"
      )

      return await fetch(response.pre_signed_url, {
        method: "PUT",
        body: file["file"],
      }).then(res => console.log(res));
  
  }
);

// export const putFile = createAsyncThunk(
//   "form/putFile",
//   async ({ res, fileObject }) => {
//     // console.log(fileObject)

//     console.log(JSON.stringify(fileObject))

//     const result = await fetch(res.payload.pre_signed_url, {
//       method: "PUT",
//       body: fileObject,
//     });

//     console.log(result)
//   }
// );

// export const getFileUrls2 = createAsyncThunk(
//   "form/getFileUrls",
//   async ({ fileName, inputName }) => {
//     if (fileName) {
//       const response = await request(
//         `${API_URL}/platform-api/v1/submission-proxy/pre-signed-url/?filename=${fileName}`,
//         null,
//         "GET"
//       );

//       return {
//         pre_signed_url: response.pre_signed_url,
//         file_future_url: response.file_future_url,
//         filedType: inputName,
//       };
//     } else {
//       throw new Error(`This file is undefined`);
//     }
//   }
// );



const formSlice = createSlice({
  name: "RootReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFileUrls.fulfilled, (state, action) => {
        // const { file_future_url, filedType } = action.payload;
        // state.files = state.files
        //   ? {
        //       ...state.files,
        //       [filedType]: file_future_url,
        //     }
        //   : { [filedType]: file_future_url };
        console.log(action);
      })

      .addCase(getFileUrls.rejected, (state, action) => {
        console.log(action);
      })
      // .addCase(putFile.fulfilled, (state, action) => {
      //   console.log(action);
      // })

      // .addCase(putFile.rejected, (state, action) => {
      //   console.log(action);
      // });
  },
});

const { reducer } = formSlice;

export default reducer;
