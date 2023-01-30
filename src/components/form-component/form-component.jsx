import { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorFiled, submitForm } from "../../store/slice";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import classnames from "classnames";

import TextInput from "../text-field/text-field";
import { createHtml } from "../../utils/utils";

import styles from "./form.module.scss";

const FormComponent = (props) => {
  const { formData, handleForm, userKey, setIsLoading, formValue } = props;
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //проверка на пустату обязательных полей
  const isEmptyFileds = (formValue, formData) => {
    return Object.entries(formValue).some(([key, objects]) => {
      if (
        formData[0].fields.find(
          (filed) => filed.display_title === key && filed.required === true
        ) &&
        objects === ""
      ) {
        return true;
      }
      return false;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    setIsLoading(true);

    //если пустые поля есть, выводим ошибку
    if (isEmptyFileds(formValue, formData)) {
      event.stopPropagation();

      setIsLoading(false);
      showFieldError(formValue);
    } else {
      submitFormRequest(formValue);
    }
  };

  const submitFormRequest = (formValue) => {
    dispatch(submitForm(JSON.stringify({ record: { fields: formValue } })))
      .then((data) => {
        if (data?.error) {
          navigate("/failed-submit", {
            state: {
              userKey: userKey,
              prevPath: window.location.href,
            },
          });
        } else {
          navigate("/success-submit", {
            state: { userKey: userKey },
          });
        }
      })
      .catch(() => {
        navigate("/failed-submit", {
          state: {
            userKey: userKey,
            prevPath: window.location.pathname,
          },
        });
      });
  };

  const showFieldError = (formValue) => {
    const emptyValue = Object.keys(formValue).filter(
      (key) => formValue[key] === ""
    );
    
    dispatch(setErrorFiled({ emptyValue: emptyValue, isEmpty: true }));
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {formData[0].fields.map((element, i) => {
        if (element.field_type !== "file") {
          return (
            <TextInput
              key={`text-field-${i}`}
              isRequired={element.required}
              title={element.display_title}
              subtitle={element.display_subtitle}
              inputType={element.field_type}
              inputName={`text-field-${i}`}
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
