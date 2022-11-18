import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

import { TextInput, FileInput } from "./inputs";
import { data } from "../../utils/fakeapi";

import styles from "./form.module.scss";

const FormContainer = () => {

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(data['forms']['high-poly']);
  }, [])
  formData && console.log(formData.fields)

  return (
    <section>
      {formData &&
        <>
          <div className={styles.formHeader}>
            <p className={styles.title}>{formData.display_title}</p>
            <p className={styles.subtitle}>
              {`${formData.display_description}`}
            </p>
          </div>

          <Form className={styles.formBody}>
            {/* {formData.fields.map((item) => {
              return console.log(item)
            })} */}
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
            <FileInput
              title='ZPrj file (3D Item)'
              subtitle='Tell us a little bit more about your work and the ideas behind it.'
              inputName='3ditem'
              inputPlaceholder='No file chosen'
              decsription={`.ZPrj file containing your item. Made in Marvelous Designer or CLO`}
            />

          </Form>
        </>

      }


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
