import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Form, Button } from "react-bootstrap";

import {
  changeUploadStatus,
  clearFileState,
  putFile,
  setErrorFiled,
} from "../../store/slice";
import BtnPreloader from "../preloaders/preloader-btn";
import trash from "../../assets/img/trash.svg";

import styles from "./upload-field.module.scss";

export const UploadField = (props) => {
  const {
    title,
    subtitle,
    inputName,
    description,
    isRequired,
  } = props;
  const { uploadStatus, errorFileds } = useSelector(
    (store) => store.RootReducer
  );
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const uploadFile = (e) => {
    e.preventDefault();
    dispatch(putFile({ file, fileName: title }));
  };

  const ClearInput = (fileName) => {
    errorFileds[fileName] &&
      dispatch(setErrorFiled({ emptyValue: fileName, isEmpty: false })); // убираем текст ошибки, если он был
    dispatch(clearFileState(fileName)); //очищаю данные файла если они были
    dispatch(changeUploadStatus({ fileName: fileName, status: "idle" }));
  };

  const addFile = (event) => {
    ClearInput(title);
    setFile(event.target.files[0]);
  };

  const RemoveFile = () => {
    document.getElementById(inputName).reset();
    ClearInput(title);
    setFile(null);
  };

  return (
    <Form
      onSubmit={(e) => uploadFile(e)}
      id={inputName}
      className={classNames(styles.inputWrapper, styles.fileUpload)}
    >
      <Form.Group className={isRequired ? styles.required : ""}>
        <p className={styles.inputTitle}>{title}</p>
        <p className={styles.inputSubtitle}>{subtitle}.</p>
        <div
          className={classNames(
            styles.uploadGroup,
            errorFileds?.[title] && styles.uploadGroupError
          )}
        >
          <Form.Control
            className={styles.fileUploadField}
            name={inputName}
            type="file"
            size="sm"
            variant="dark"
            required={isRequired}
            onChange={addFile}
          />
          <div
            className={classNames(
              uploadStatus[title] === "error" && styles.errorBtn,
              uploadStatus[title] === "success" && styles.dNone,
              styles.uploadBtn
            )}
          >
            <Button type="submit" variant="dark">
              {uploadStatus[title] === "error" && "Error"}
              {uploadStatus[title] === "loading" && <BtnPreloader />}
              {uploadStatus[title] !== "error" &&
                uploadStatus[title] !== "loading" &&
                "Upload"}
            </Button>
          </div>

          <div
            className={classNames(
              uploadStatus[title] === "success" && styles.dBlock,
              styles.trashBtn
            )}
          >
            <Button onClick={RemoveFile} variant="dark">
              {<img src={trash} alt="Remove file" />}
            </Button>
          </div>
        </div>
      </Form.Group>
      {errorFileds?.[title] && (
        <>
          <Form.Text className={styles.invalidFeedback}>
            This is a required field
          </Form.Text>
        </>
      )}

      {description && (
        <Form.Text
          className={styles.inputDescr}
          dangerouslySetInnerHTML={description}
        />
      )}
    </Form>
  );
};
