import styles from "./inputs.module.scss";
import classnames from "classnames";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFileUrls, putFile } from "../../store/slice";
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
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const uploadFile = (e) => {
        e.preventDefault();
        const fileName = file.name
        const fileObject = {
            'lastModified'     : file.lastModified,
            'lastModifiedDate' : file.lastModifiedDate,
            'name'             : file.name,
            'size'             : file.size,
            'type'             : file.type
         };  
         
        dispatch(getFileUrls({fileName, inputName})).then(res => dispatch(putFile({res, fileObject })))

    }
    const addFile = (event) => {
        setFile(event.target.files[0]);
        
    }

    return (
        <Form
            onSubmit={e => uploadFile(e, inputName)}
            // method="post"
            // encType="multipart/form-data"
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
                        onChange={addFile}
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
