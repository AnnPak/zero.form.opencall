import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { request } from "../utils/request";

const initialState = {
  files: {},
  uploadStatus: {},
  errorFileds: {},

  formSending: false,
  formSuccess: false,
  formError: false,
};

export const putFile = createAsyncThunk(
  "form/getFileUrls",
  async ({ file, inputName }) => {
    const response = await request(
      `${API_URL}/platform-api/v1/submission-proxy/pre-signed-url/?filename=${file.name}`,
      null,
      "GET"
    );

    await fetch(response.pre_signed_url, {
      method: "PUT",
      body: file,
    }).then((res) => console.log(res));

    return {
      pre_signed_url: response.pre_signed_url,
      file_future_url: response.file_future_url,
      filedType: inputName,
    };
  }
);

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (record) => {
    return await request(
      `${API_URL}/platform-api/v1/submission-proxy/`,
      record,
      "POST"
    );
  }
)

const formSlice = createSlice({
  name: "RootReducer",
  initialState,
  reducers: {
    changeUploadStatus: (state, action) => {
      const { inputName, status } = action.payload;
      state.uploadStatus = {
        ...state?.uploadStatus,
        [inputName]: status,
      };
    },
    setErrorFiled: (state, action) => {
      const { fieldName, isEmpty } = action.payload;
      console.log(action.payload);
      state.errorFileds = {
        ...state?.errorFileds,
        [fieldName]: isEmpty,
      };
    },
    clearFileState: (state, action) => {
      state.files = {
        ...state?.files,
        [action.payload]: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(putFile.pending, (state, action) => {
        const inputName = action.meta.arg.inputName;
        state.uploadStatus = {
          ...state?.uploadStatus,
          [inputName]: "loading",
        };
      })
      .addCase(putFile.fulfilled, (state, action) => {
        const { file_future_url, filedType } = action.payload;

        state.files = {
          ...state?.files,
          [filedType]: [
            {
              'url': file_future_url,
            }
          ],
        };

        state.uploadStatus = {
          ...state?.uploadStatus,
          [filedType]: "success",
        };

        state.errorFileds = {
          ...state?.errorFileds,
          [filedType]: false,
        };
      })

      .addCase(putFile.rejected, (state, action) => {
        const { filedType } = action.payload;

        state.uploadStatus = {
          ...state?.uploadStatus,
          [filedType]: "error",
        };

        state.errorFileds = {
          ...state?.errorFileds,
          [filedType]: true,
        };
      })

      .addCase(submitForm.pending, (state) => {
        state.formSending = true;
        state.formSuccess = false;
        state.formError = false;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        console.log(action)
        state.formSending = false;
        state.formSuccess = true;
        state.formError = false;
      })

      .addCase(submitForm.rejected, (state) => {
        state.formSending = false;
        state.formSuccess = false;
        state.formError = true;
      })
  },
});

const { actions, reducer } = formSlice;

export const { clearFileState, setErrorFiled, changeUploadStatus } = actions;

export default reducer;
