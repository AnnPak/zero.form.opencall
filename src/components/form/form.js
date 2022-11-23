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
    const { userKey } = useParams();

    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        const formParam = searchParams.get("form_type");

        if (!formParam?.includes("highPoly") && !formParam?.includes("lowPoly")) {
            return navigate("/error");
        }

        formParam.includes("highPoly") && setFormType("high-poly");
        formParam.includes("lowPoly") && setFormType("low-poly");
        // eslint-disable-next-line
    }, [searchParams]);

    useEffect(() => {
        formType && setFormData(data.filter((form) => form.type === formType));
    }, [formType]);

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

                    <Form className={styles.formBody}>
                        {formData[0].fields.map((element) => {
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
                                        />
                                    );

                                    break;
                                case "file":
                                    returnElement = (
                                        <FileInput
                                            key={element.field_name}
                                            title={element.display_title}
                                            subtitle={element.display_subtitle}
                                            inputName={element.field_name}
                                            description={createHtml(element.display_description)}
                                        />
                                    );
                                    break;
                                default:
                                    break;
                            }
                            return returnElement;
                        })}
                        <Form.Control type="hidden" name="user" value={userKey} />
                        <div className={classnames(styleInputs.inputWrapper, styleInputs.inputWrapperLast )}>
                            <Button type="submit" variant="info" className={styles.buttonInfo}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </section>
            )}

            {/* <Form
          action="http://localhost:8080/upload_file"
          method="post"
          enctype="multipart/form-data"
        >
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Select a File"
              name="file"
            />
          </Form.Group>
          <Form.Group>
            <Button variant="info" type="submit">
              Upload
            </Button>
          </Form.Group>
        </Form> */}
        </>
    );
};

export default FormContainer;
