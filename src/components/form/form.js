// import FileUploadProgress from "react-fileupload-progress";
import styles from "./form.module.scss";
import { TextInput } from "./inputs";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const FormContainer = () => {
  return (
    <section>
      <div className={styles.formHeader}>
        <p className={styles.title}>Submit a High-poly Garment</p>
        <p className={styles.subtitle}>
          Submit your digital fashion piece here
        </p>
      </div>

      <div className={styles.formBody}>
        <TextInput
          isRequired={true}
          title='Name of the item'
          subtitle='It will be used on the ZERO10 Platform alongside your name and the item description (below).'
          inputType='text'
          inputName='name'
          inputPlaceholder='Disappearing Pants '
          decsription='Keep it short and unique'
        />
        <TextInput
          isRequired={true}
          title='Describe the item'
          subtitle='Tell us a little bit more about your work and the ideas behind it.'
          inputType='textarea'
          inputName='description'
          inputPlaceholder='Add a description '
          decsription={`Good description: "This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden."
          Bad description: "short jacket".`}
        />

        

      </div>
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
