import { useEffect, useState,  } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import { UploadField } from "../upload-field/upload-field";
import { data } from "../../utils/fakeapi";
import { useSelector } from "react-redux";
import Preloader from "../preloaders/preloader";
import FormComponent from "../form-component/form-component";

import styles from "./form-container.module.scss";
import { createHtml } from "../../utils/utils";

const FormContainer = () => {
  const [formData, setFormData] = useState(null);
  const [formValue, setFormValue] = useState({}); //массив значений полей формы и полей upload
  const [isLoading, setIsLoading] = useState(false);
  const { userKey } = useParams();
  const { files } = useSelector((store) => store.RootReducer);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  // при изменении formData обновляем formValue
  useEffect(() => {
    formData &&
      formData[0].fields.map((element) => {
        const value = {
          [element.display_title]: element.value ? element.value : "",
        };

        return setFormValue((formValuePrev) => ({
          ...formValuePrev,
          ...value,
        }));
      });
  }, [formData]);

  const handleForm = (name, value) => {
    setFormValue({ ...formValue, [name]: value });
  };

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
            <h1 className={styles.title}>{formData[0].display_title}</h1>
            <h2
              className={styles.subtitle}
              dangerouslySetInnerHTML={createHtml(
                formData[0].display_description
              )}
            />
          </div>

          <FormComponent
            setIsLoading={setIsLoading}
            formValue={formValue}
            formData={formData}
            handleForm={handleForm}
            userKey={userKey}
          />

          {formData[0].fields.map((element, i) => {
            if (element.field_type === "file") {
              return (
                <UploadField
                  key={`upload-field-${i}`}
                  title={element.display_title}
                  subtitle={element.display_subtitle}
                  isRequired={element.required}
                  inputName={`upload-field-${i}`}
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
