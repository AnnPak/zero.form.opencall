import styles from "./inputs.module.scss";
import classnames from "classnames";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUploadStatus,
  clearFileState,
  putFile,
  setErrorFiled,
} from "../../store/slice";
import BtnPreloader from "../preloaders/preloader-btn";
import trash from "../../assets/img/trash.svg";

window.Buffer = window.Buffer || require("buffer").Buffer;

export const TextInput = (props) => {
  const {
    isRequired,
    title,
    subtitle,
    inputType,
    inputName,
    inputPlaceholder,
    description,
    value,
    handleForm,
    error,
    validationCustom,
    invalidFeedback,
  } = props;

  const { errorFileds } = useSelector((store) => store.RootReducer);

  return (
    <Form.Group
      className={classnames(
        styles.inputWrapper,
        isRequired && styles.required,
        inputType === "hidden" && styles.dNone
      )}
      controlId={validationCustom}
    >
      {title && <p className={styles.inputTitle}>{title}</p>}
      {subtitle && <p className={styles.inputSubtitle}>{subtitle}</p>}

      <Form.Control
        {...(inputType === "textarea" ? { as: "textarea" } : {})}
        {...(inputType === "textarea" ? { rows: "5" } : {})}
        className={styles.formControl}
        type={inputType}
        name={inputName}
        required={isRequired}
        placeholder={inputPlaceholder}
        value={value}
        error={error}
        onChange={(e) => handleForm(title, e.target.value)}
      />
      {errorFileds?.[title] && (
        <>
          <Form.Text className={styles.invalidFeedback}>
            {invalidFeedback ? invalidFeedback : "This is a required field"}
          </Form.Text>
        </>
      )}

      {description && (
        <Form.Text
          className={styles.inputDescr}
          dangerouslySetInnerHTML={description}
        />
      )}
    </Form.Group>
  );
};

export const FileInput = (props) => {
  const { title, subtitle, inputName, description, invalidFeedback } = props;
  const { uploadStatus, errorFileds } = useSelector(
    (store) => store.RootReducer
  );
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const uploadFile = (e) => {
    e.preventDefault();
    dispatch(putFile({ file, fileName: title }));
  };

  const addFile = (event) => {
    dispatch(setErrorFiled({ fileName: title, isEmpty: false }));
    dispatch(clearFileState(title)); //очищаю данные файла если они были
    dispatch(changeUploadStatus({ fileName: title, status: "idle" })); //меняю статус файла на idle

    setFile(event.target.files[0]);
  };

  const RemoveFile = () => {
    document.getElementById(inputName).reset();
    dispatch(clearFileState(title)); //очищаю данные файла если они были
    dispatch(changeUploadStatus({ fileName: title, status: "idle" })); //меняю статус файла на idle
    setFile(null);
  }

  return (
    <Form
      onSubmit={(e) => uploadFile(e)}
      id={inputName}
      className={classnames(styles.inputWrapper, styles.fileUpload)}
    >
      <Form.Group>
        <p className={styles.inputTitle}>{title}</p>
        <p className={styles.inputSubtitle}>{subtitle}.</p>
        <div
          className={classnames(
            styles.uploadGroup,
            errorFileds?.[title] && styles.uploadGroupError
          )}
        >
          <Form.Control
            className={styles.fileUploadInput}
            name={inputName}
            type="file"
            size="sm"
            variant="dark"
            required={true}
            onChange={addFile}
          />
          <div
            className={classnames(
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
            className={classnames(
              uploadStatus[title] === "success" && styles.dBlock,
              styles.trashBtn
            )}>
            <Button onClick={RemoveFile} variant="dark">
              {
                <img src={trash} alt="Remove file" />
                
              }
            </Button>
          </div>
        </div>
      </Form.Group>
      {errorFileds?.[title] && (
        <>
          <Form.Text className={styles.invalidFeedback}>
            {invalidFeedback ? invalidFeedback : "This is a required field"}
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
