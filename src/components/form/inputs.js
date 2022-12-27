import styles from "./inputs.module.scss";
import classnames from "classnames";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUploadStatus,
  clearFileState,
  getFileUrls,
  putFile,
  setErrorFiled,
} from "../../store/slice";
import BtnPreloader from "../preloaders/preloader-btn";

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
        onChange={(e) => handleForm(inputName, e.target.value)}
      />
      <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
        {invalidFeedback ? invalidFeedback : "This is a required field"}
      </Form.Control.Feedback>

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

  const [btnName, setBtnName] = useState("Upload");

  const dispatch = useDispatch();

  const uploadFile = (e) => {
    e.preventDefault();
    dispatch(putFile({ file, inputName }));
  };
  const addFile = (event) => {

    dispatch(setErrorFiled({fieldName: inputName, isEmpty: false}))
    dispatch(clearFileState(inputName)); //очищаю данные файла если они были
    dispatch(changeUploadStatus({ inputName, status: 'idle' })); //меняю статус файла на idle

    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (uploadStatus?.[inputName]) {
      // let timeOut;
      switch (uploadStatus[inputName]) {
        case "loading":
          setBtnName(<BtnPreloader />);
          break;
        case "error":
          setBtnName("Error");
          break;
        case "success":
          setBtnName("Done");
          break;
        default:
          setBtnName("Upload");
          break;
      }
    }
  }, [uploadStatus, inputName, dispatch]);

  useEffect(() => {
    console.log(errorFileds?.[inputName]);
  }, [errorFileds])

  return (
    <Form
      onSubmit={(e) => uploadFile(e, inputName)}
      className={classnames(styles.inputWrapper, styles.fileUpload)}
    >
      <Form.Group>
        <p className={styles.inputTitle}>{title}</p>
        <p className={styles.inputSubtitle}>{subtitle}.</p>
        <div
          className={classnames(
            styles.uploadGroup,
            errorFileds?.[inputName] && styles.uploadGroupError
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
              btnName === "Error" && styles.errorBtn,
              btnName === "Done" && styles.successBtn,
              styles.uploadBtn
            )}
          >
            <Button type="submit" variant="dark">
              {btnName}
            </Button>
          </div>
        </div>
      </Form.Group>
      {errorFileds?.[inputName] && (
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
