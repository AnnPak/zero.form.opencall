import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import { TextInput, FileInput } from "./inputs";
import { data } from "../../utils/fakeapi";

import styles from "./form.module.scss";

const FormContainer = () => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        setFormData(data.filter((form) => form.type === "high-poly"));
    }, []);

    function createHtml(value) {
      return {__html: value};
    }

    return (
        <section>
            {formData && (
                <>
                    <div className={styles.formHeader}>
                        <p className={styles.title}>{formData[0].display_title}</p>
                        <p className={styles.subtitle}>
                          <div dangerouslySetInnerHTML={createHtml(formData[0].display_description)}/></p>
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
                    </Form>
                </>
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
        </section>
    );
};

export default FormContainer;
