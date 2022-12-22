import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { request } from "../utils/request";
import S3 from 'react-aws-s3';

const initialState = {
  files: {},
};

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS,
  secretAccessKey: process.env.REACT_APP_SECRET,
}

export const getFileUrls = createAsyncThunk(
  "form/getFileUrls",
  async (file) => {
    const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, file.name)
    .then(data => console.log(data.location))
    .catch(err => console.error(err))
  }
);

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

export const putFile = createAsyncThunk(
  "form/putFile",
  async ({ res, fileObject }) => {
    // console.log(fileObject)

    console.log(JSON.stringify(fileObject))
    return await request(res.payload.pre_signed_url, JSON.stringify(fileObject), "PUT");
  }
);

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
      .addCase(putFile.fulfilled, (state, action) => {
        console.log(action);
      })

      .addCase(putFile.rejected, (state, action) => {
        console.log(action);
      });
  },
});

const { reducer } = formSlice;

export default reducer;
