import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import classnames from "classnames";

import { TextInput, FileInput } from "./inputs";
import { data } from "../../utils/fakeapi";

import styles from "./form.module.scss";
import styleInputs from "./inputs.module.scss";

const FormContainer = () => {
    const [formData, setFormData] = useState(null);
    const [formType, setFormType] = useState(null);
    const [formValue, setFormValue] = useState({});
    const { userKey } = useParams();

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity());

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

    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        const formParam = searchParams.get("form_type");

        if (formParam !== "highPoly" && formParam !== "lowPoly") {
            return navigate("/error");
        }
        formParam === "highPoly" && setFormType("high-poly");
        formParam === "lowPoly" && setFormType("low-poly");
        // eslint-disable-next-line
    }, [searchParams]);

    useEffect(() => {
        formType && setFormData(data.filter((form) => form.type === formType));
    }, [formType]);

    useEffect(() => {
        formData &&
            formData[0].fields.map((element) => {
                const value = { [element.field_name]: "" };
                return setFormValue((formValue2) => ({ ...formValue2, ...value }));
            });
    }, [formData]);

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
                            dangerouslySetInnerHTML={createHtml(formData[0].display_description)}
                        />
                    </div>

                    <Form
                        className={styles.formBody}
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        {formData[0].fields.map((element, i) => {
                            let returnElement = null;
                            switch (element.field_type) {
                                case "hidden":
                                case "textarea":
                                case "text":
                                    // const description = createHtml(element.display_description)
                                    returnElement = (
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

                                    break;
                                // case "file":
                                //     returnElement = (
                                //         <FileInput
                                //             key={element.field_name}
                                //             title={element.display_title}
                                //             subtitle={element.display_subtitle}
                                //             inputName={element.field_name}
                                //             description={createHtml(element.display_description)}
                                //         />
                                //     );
                                //     break;
                                default:
                                    break;
                            }
                            return returnElement;
                        })}
                       
                        <Form.Control type="hidden" name="user" value={userKey} />
                        <div
                            className={classnames(
                                styleInputs.inputWrapper,
                                styleInputs.inputWrapperLast
                            )}
                        >
                            <Button type="submit" variant="info" className={styles.buttonInfo}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <FileInput
                            key='3ditem'
                            title='"ZPRJ file (3D Item) link"'
                            subtitle='"ZPRJ file"'
                            inputName='"3ditem"'
                            description={createHtml("<p>Garment project made in CLO or Marvelous</p>")}
                        />
                </section>
            )}
        </>
    );
};

export default FormContainer;
