import { Form, Button } from "react-bootstrap";
import classnames from "classnames";

import TextInput from "../text-field/text-field";
import { createHtml } from "../../utils/utils";

import styles from "./form.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorFiled, submitForm } from "../../store/slice";
import { useNavigate } from "react-router-dom";

const FormComponent = (props) => {
  const { formData, handleForm, userKey, setIsLoading, formValue } = props;
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    setIsLoading(true);

    alert(JSON.stringify({ record: { fields: formValue } }));
    const form = event.currentTarget;

    //проверяем есть ои пустые поля в форме и вне ее
    const isEmptyFileds = Object.values(formValue).some((item) => item === "");

    if (form.checkValidity() === false || isEmptyFileds) {
      event.stopPropagation();
      setIsLoading(false);

      //если пустые поля есть, выводим ошибку
      if (isEmptyFileds) {
        const emptyValue = Object.keys(formValue).filter(
          (key) => formValue[key] === ""
        );

        emptyValue.forEach((fieldName) => {
          dispatch(setErrorFiled({ fileName: fieldName, isEmpty: true }));
        });
      }
    } else {
      dispatch(submitForm(JSON.stringify({ record: { fields: formValue } })))
        .then((data) => {
          if (data?.error) {
            navigate("/failed-submit", {
              state: { userKey: userKey, prevPath: window.location.href },
            });
          } else {
            navigate("/success-submit", {
              state: { userKey: userKey },
            });
          }
        })
        .catch(() => {
          navigate("/failed-submit", {
            state: { userKey: userKey, prevPath: window.location.pathname },
          });
        });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {formData[0].fields.map((element, i) => {
        if (element.field_type !== "file") {
          return (
            <TextInput
              key={element.field_name}
              isRequired={true}
              title={element.display_title}
              subtitle={element.display_subtitle}
              inputType={element.field_type}
              inputName={element.field_name}
              inputPlaceholder={element.field_placeholder}
              display={element.display}
              description={createHtml(element.display_description)}
              value={element.value}
              handleForm={handleForm}
              validationCustom={`validationCustom${i}`}
              invalidFeedback={element.invalid_feedback}
            />
          );
        } else {
          return null;
        }
      })}

      <Form.Control type="hidden" name="user" value={userKey} />
      <div
        className={classnames(
          styles.inputWrapper,
          styles.inputWrapperLast,
          styles.submitBtnWrapper
        )}
      >
        <Button type="submit" variant="info" className={styles.buttonInfo}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;
