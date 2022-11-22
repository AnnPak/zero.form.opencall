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
    } = props;

    return (
        <Form.Group
            className={classnames(styles.inputWrapper, isRequired && styles.required)}
            controlId="formBasicEmail"
        >
            {title && <p className={styles.inputTitle}>{title}</p>}
            {subtitle && <p className={styles.inputSubtitle}>{subtitle}</p>}

            <Form.Control
                {...(inputType === "textarea" ? { as: "textarea" } : {})}
                {...(inputType === "textarea" ? { rows: "5" } : {})}
                type={inputType}
                name={inputName}
                placeholder={inputPlaceholder}
                value={value}
            />

            {description && <Form.Text className={styles.inputDescr} dangerouslySetInnerHTML={description} />}
        </Form.Group>
    );
};

export const FileInput = (props) => {
    const { title, subtitle, inputName, description } = props;
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
                <div className={styles.uploadGroup}>
                    <Form.Control
                        className={styles.fileUploadInput}
                        name={inputName}
                        type="file"
                        size="sm"
                        variant="dark"
                    />
                    <Button type="submit" variant="dark">
                        Upload
                    </Button>
                </div>
            </Form.Group>

            {description && <Form.Text className={styles.inputDescr} dangerouslySetInnerHTML={description} />}
        </Form>
    );
};
