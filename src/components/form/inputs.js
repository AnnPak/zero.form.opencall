import styles from "./inputs.module.scss";
import classnames from "classnames";
import {  Form, Button } from "react-bootstrap";
export const TextInput = (props) => {
  const {
    isRequired,
    title,
    subtitle,
    inputType,
    inputName,
    inputPlaceholder,
    decsription,
  } = props;
  return (


    <Form.Group className={classnames(styles.inputWrapper, isRequired && styles.required)} controlId="formBasicEmail">
      <p className={styles.inputTitle}>{title}</p>
      <p className={styles.inputSubtitle}>{subtitle}.</p>

      <Form.Control
        {...(inputType === "textarea" ? { as: "textarea" } : {})}
        {...(inputType === "textarea" ? { rows: "5" } : {})}
        {...(inputType !== "textarea" ? { type: { inputType } } : {})}
        name={inputName}
        placeholder={inputPlaceholder} />


      <Form.Text className={styles.inputDescr}>
        {decsription}
      </Form.Text>
    </Form.Group>

  );
};

export const FileInput = (props) => {
  const {
    title,
    subtitle,
    inputName,
    decsription,
  } = props;
  return (
    <Form
      action="http://localhost:8080/upload_file"
      method="post"
      enctype="multipart/form-data"
      className={classnames(styles.inputWrapper, styles.fileUpload)}
    >
      <Form.Group>
        <p className={styles.inputTitle}>{title}</p>
        <p className={styles.inputSubtitle}>{subtitle}.</p>
        <Form.Control className={styles.fileUploadInput} name={inputName} type="file" size="sm" />
      </Form.Group>
      <Form.Group>
        <Button variant="info" type="submit">
          Upload
        </Button>
      </Form.Group>
      <Form.Text className={styles.inputDescr}>
        {decsription}
      </Form.Text>
    </Form>
  )
}
