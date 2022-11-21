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
    description,
    display,
    value
  } = props;
  return (


    <Form.Group  className={classnames(styles.inputWrapper, isRequired && styles.required, !display && styles.dNone)} controlId="formBasicEmail">
      <p className={styles.inputTitle}>{title}</p>
      <p className={styles.inputSubtitle}>{subtitle}.</p>

      <Form.Control
        {...(inputType === "textarea" ? { as: "textarea" } : {})}
        {...(inputType === "textarea" ? { rows: "5" } : {})}
        {...(inputType !== "textarea" ? { type: { inputType } } : {})}
        name={inputName}
        placeholder={inputPlaceholder}
        value={value}/>


      <Form.Text className={styles.inputDescr}>
        {description}
      </Form.Text>
    </Form.Group>

  );
};

export const FileInput = (props) => {
  const {
    title,
    subtitle,
    inputName,
    description,
  } = props;
  return (
    <Form
      action="http://localhost:8080/upload_file"
      method="post"
      enctype="multipart/form-data"
      className={classnames(styles.inputWrapper, styles.fileUpload)}
      variant='dark'
    >
      <Form.Group variant='dark'>
        <p className={styles.inputTitle}>{title}</p>
        <p className={styles.inputSubtitle}>{subtitle}.</p>
        <Form.Control variant="dark" className={styles.fileUploadInput} name={inputName} type="file" size="sm" />
      </Form.Group>
      <Form.Group>
        <Button variant="dark" type="submit" >
          Upload
        </Button>
      </Form.Group>
      <Form.Text className={styles.inputDescr} variant='dark'>
        {description}
      </Form.Text>
    </Form>
  )
}
