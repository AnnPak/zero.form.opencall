import FileUploadProgress from "react-fileupload-progress";
import styles from "./form.module.scss";

const Form = () => {
  return (
    <section>
      <div className={styles.formHeader}>
        <p className={styles.title}>Submit a High-poly Garment</p>
        <p className={styles.subtitle}>
          Submit your digital fashion piece here
        </p>
      </div>

      <div className={styles.formBody}>

        <div className={styles.inputWrapper}>
          <p className={styles.inputTitle}>Name of the item</p>
          <p className={styles.inputSubtitle}>
            It will be used on the ZERO10 Platform alongside your name and the
            item description (below).
          </p>
          <input type="text" name="name" placeholder="Disappearing Pants " />
          <div className={styles.inputDescr}>Keep it short and unique</div>
        </div>
      </div>
    </section>
  );
};

export default Form;
