import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import { UploadField } from "../upload-field/upload-field";
import { data } from "../../utils/fakeapi";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../preloaders/preloader";
import FormComponent from "../form-component/form-component";

import styles from "./form-container.module.scss";
import { createHtml } from "../../utils/utils";
import { setErrorFiled } from "../../store/slice";

const FormContainer = () => {
  const [formData, setFormData] = useState(null);
  const [formValue, setFormValue] = useState({}); //массив значений полей формы и полей upload
  const [isLoading, setIsLoading] = useState(false);
  const { userKey } = useParams();
  const { files, errorFileds } = useSelector((store) => store.RootReducer);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // По get параметру определяем тип формы
  useEffect(() => {
    const formParam = searchParams.get("form_type");

    switch (formParam) {
      case "highPoly":
        setFormData(data.filter((form) => form.type === "high-poly"));
        break;
      case "lowPoly":
        setFormData(data.filter((form) => form.type === "low-poly"));
        break;
      default:
        return navigate("/error");
    }
  }, [navigate, searchParams]);

  // Добавляем данные файлов в formValue
  useEffect(() => {
    setFormValue((formValuePrev) => ({ ...formValuePrev, ...files }));
  }, [files]);

  // при изменении formData обновляем formValue
  useEffect(() => {
    const AuthorParam = searchParams.get("prefill_Author");

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

    setFormValue((formValuePrev) => ({
      ...formValuePrev,
      Author: [AuthorParam],
    }));
  }, [formData, searchParams]);

  const handleForm = (name, value) => {
    setFormValue({ ...formValue, [name]: value });
    if (errorFileds[`${name}`]) {
      dispatch(setErrorFiled({ emptyValue: `${name}`, isEmpty: false }));
    }
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
            <h1 className={styles.title}>{formData[0].field_name}</h1>
            <h2
              className={styles.subtitle}
              dangerouslySetInnerHTML={createHtml(
                formData[0].display_hint
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
                  name={element.field_name}
                  subtitle={element.display_description}
                  isRequired={element.required}
                  inputName={`upload-field-${i}`}
                  description={createHtml(element.display_hint)}
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
