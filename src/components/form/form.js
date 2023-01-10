import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import classnames from "classnames";

import { TextInput, FileInput } from "./inputs";
import { data } from "../../utils/fakeapi";

import styles from "./form.module.scss";
import styleInputs from "./inputs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setErrorFiled, submitForm } from "../../store/slice";
import Preloader from "../preloaders/preloader";

const FormContainer = () => {
  const [formData, setFormData] = useState(null);
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userKey } = useParams();
  const { files } = useSelector((store) => store.RootReducer);

  const [validated, setValidated] = useState(false);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // По get параметру определяем тип формы
  useEffect(() => {
    const formParam = searchParams.get("form_type");

    if (formParam !== "highPoly" && formParam !== "lowPoly") {
      return navigate("/error");
    }
    formParam === "highPoly" &&
      setFormData(data.filter((form) => form.type === "high-poly"));
    formParam === "lowPoly" &&
      setFormData(data.filter((form) => form.type === "low-poly"));

    // eslint-disable-next-line
  }, [searchParams]);

  // Добавляем данные файлов в formValue
  useEffect(() => {
    setFormValue((formValuePrev) => ({ ...formValuePrev, ...files }));
  }, [files]);

  useEffect(() => {
    formData &&
      formData[0].fields.map((element) => {
        const value = {
          [element.field_name]: element.value ? element.value : "",
        };

        return setFormValue((formValuePrev) => ({
          ...formValuePrev,
          ...value,
        }));
      });
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    setIsLoading(true);

    const form = event.currentTarget;
    const isEmptyFileds = Object.values(formValue).some((item) => item === ""); //есть ои пустые поля

    if (form.checkValidity() === false || isEmptyFileds) {
      event.stopPropagation();

      setIsLoading(false);

      //отбираю ключи, у которых значения пустые
      if (isEmptyFileds) {
        const emptyValue = Object.keys(formValue).filter(
          (key) => formValue[key] === ""
        ); 

        emptyValue.forEach((fieldName) => {
          //если пустые поля есть, добавить true
          dispatch(setErrorFiled({ fieldName, isEmpty: true })); 
        });
      }
    } else {
      dispatch(submitForm(JSON.stringify({ record: formValue })))
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

  const handleForm = (name, value) => {
    setFormValue({ ...formValue, [name]: value });
  };

  function createHtml(value) {
    return { __html: value };
  }

  return (
    <>
      {(isLoading || !formData) && (
        <>
          <Preloader />
        </>
      )}
      {formData && !isLoading && (
        <section className={styles.uploadGarment}>
          <div className={styles.formHeader}>
            <p className={styles.title}>{formData[0].display_title}</p>
            <p
              className={styles.subtitle}
              dangerouslySetInnerHTML={createHtml(
                formData[0].display_description
              )}
            />
          </div>

          <Form
            className={styles.formBody}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
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
                styleInputs.inputWrapper,
                styleInputs.inputWrapperLast,
                styleInputs.submitBtnWrapper
              )}
            >
              <Button
                type="submit"
                variant="info"
                className={styles.buttonInfo}
              >
                Submit
              </Button>
            </div>
          </Form>

          {formData[0].fields.map((element) => {
            if (element.field_type === "file") {
              return (
                <FileInput
                  key={element.field_name}
                  title={element.display_title}
                  subtitle={element.display_subtitle}
                  inputName={element.field_name}
                  description={createHtml(element.display_description)}
                  invalidFeedback={element.invalid_feedback}
                />
              );
            } else {
              return null;
            }
          })}
        </section>
      )}
    </>
  );
};

export default FormContainer;
