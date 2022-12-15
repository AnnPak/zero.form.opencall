import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import classnames from "classnames";

import { TextInput, FileInput } from "./inputs";
import { data } from "../../utils/fakeapi";

import styles from "./form.module.scss";
import styleInputs from "./inputs.module.scss";
import { useSelector } from "react-redux";

const FormContainer = () => {
  const [formData, setFormData] = useState(null);
  const [formType, setFormType] = useState(null);
  const [formValue, setFormValue] = useState({});
  const { userKey } = useParams();
  const files = useSelector(store => store.RootReducer);

  const [validated, setValidated] = useState(false);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

// По get параметру определяем тип формы
  useEffect(() => {
    const formParam = searchParams.get("form_type");

    if (formParam !== "highPoly" && formParam !== "lowPoly") {
      return navigate("/error");
    }
    formParam === "highPoly" && setFormData(data.filter((form) => form.type === "high-poly"));
    formParam === "lowPoly" && setFormData(data.filter((form) => form.type === "low-poly"));
    // eslint-disable-next-line
  }, [searchParams]);

// Добавляем данные файлов в formValue
  useEffect(() => {
    setFormValue((formValuePrev) => ({ ...formValuePrev, ...files }));
  }, [files]);

//   useEffect(() => {
//     formType && setFormData(data.filter((form) => form.type === formType));
//   }, [formType]);

  useEffect(() => {
    formData &&
      formData[0].fields.map((element) => {
        const value = { [element.field_name]: "" };
        return setFormValue((formValuePrev) => ({ ...formValuePrev, ...value }));
      });
  }, [formData]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const result = Object.values(formValue).some((item) => item === "");

    alert(JSON.stringify(formValue));
    alert("Пустое значние: " + result);
    event.target.reset();

    setValidated(true);
  };

  const handleForm = (name, value) => {
    setFormValue({ ...formValue, [name]: value });
  };

  function createHtml(value) {
    return { __html: value };
  }

  return (
    <>
      {formData && (
        <section>
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
                styleInputs.inputWrapperLast
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
          <FileInput
            key="3ditem"
            title="ZPRJ file (3D Item) link"
            subtitle="ZPRJ file"
            inputName="3ditem"
            description={createHtml(
              "<p>Garment project made in CLO or Marvelous</p>"
            )}
          />
          <FileInput
            key="3ditem2"
            title="ZPRJ file (3D Item2) link 2"
            subtitle="ZPRJ file2"
            inputName="3ditem2"
            description={createHtml(
              "<p>Garment project made in CLO or Marvelous</p>"
            )}
          />
        </section>
      )}
    </>
  );
};

export default FormContainer;
