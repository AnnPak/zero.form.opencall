import styles from "./inputs.module.scss";
import classnames from "classnames";

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
    <div
      className={classnames(styles.inputWrapper, isRequired && styles.required)}
    >
      <p className={styles.inputTitle}>{title}</p>
      <p className={styles.inputSubtitle}>{subtitle}.</p>

      {inputType !== "textarea" ? (
        <input
          type={inputType}
          name={inputName}
          placeholder={inputPlaceholder}
        />
      ) : (
        <textarea name={inputName} placeholder={inputPlaceholder} rows="5" />
      )}

      <div className={styles.inputDescr}>{decsription}</div>
    </div>
  );
};

export const UploadFile = () => {

}
