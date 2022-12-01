import styles from "./inputs.module.scss";
import classnames from "classnames";
import { Form, Button } from "react-bootstrap";
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
        invalidFeedback
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
                {invalidFeedback}
            </Form.Control.Feedback>

            {description && (
                <Form.Text className={styles.inputDescr} dangerouslySetInnerHTML={description} />
            )}
        </Form.Group>
    );
};

export const FileInput = (props) => {
    const { title, subtitle, inputName, description, isRequired } = props;
    return (
        <Form
            action="http://localhost:8080/upload_file"
            method="post"
            encType="multipart/form-data"
            className={classnames(styles.inputWrapper, styles.fileUpload)}
        >
            <Form.Group>
                <p className={styles.inputTitle}>{title}</p>
                <p className={styles.inputSubtitle}>{subtitle}.</p>
                <div className={styles.uploadGroup}>
                    <Form.Control
                        className={styles.fileUploadInput}
                        name={inputName}
                        type="file"
                        size="sm"
                        variant="dark"
                        required={isRequired}
                    />
                    <Button type="submit" variant="dark">
                        Upload
                    </Button>
                </div>
            </Form.Group>

            {description && (
                <Form.Text className={styles.inputDescr} dangerouslySetInnerHTML={description} />
            )}
        </Form>
    );
};
