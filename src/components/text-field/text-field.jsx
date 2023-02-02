import classNames from "classnames";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import styles from "./text-field.module.scss";

const TextInput = (props) => {
  const {
    isRequired,
    title,
    name,
    subtitle,
    inputType,
    inputName,
    inputPlaceholder,
    description,
    value,
    handleForm,
    error,
    validationCustom,
  } = props;

  const { errorFileds } = useSelector((store) => store.RootReducer);

  return (
    <Form.Group
      className={classNames(
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
        onChange={(e) => handleForm(name, e.target.value)}
      />
      {errorFileds?.[name] && (
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
    </Form.Group>
  );
};

export default TextInput;
