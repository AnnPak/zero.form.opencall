import styles from "./responses.module.scss";
import { Button } from "react-bootstrap";

export const SuccessResponse = () => {
    return (
        <section className={styles.message}>
            <div className={styles.textBlock}>
                <p className={styles.title}>The form has been successfully submitted</p>
                <p className={styles.subtitle}>
                    We'll get back to you as soon as we've looked at it, thank you
                </p>
            </div>
        </section>
    );
};


export const ErrorResponse = ({tryAgain}) => {
  return (
      <section className={styles.message}>
          <div className={styles.textBlock}>
              <p className={styles.title}>We were unable to send the form</p>
              <p className={styles.subtitle}>
              There seems to be a server-side error, wait a while and try again
              </p>
              <Button type="button" variant="info" onClick={tryAgain} className={styles.buttonInfo}>
                Try again
              </Button>
          </div>
      </section>
  );
};


