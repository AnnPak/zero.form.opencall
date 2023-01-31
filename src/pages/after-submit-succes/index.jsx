
import styles from './after-submit-succes.module.scss'

 const AfterSubmutSuccessPage = () => {
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

export default AfterSubmutSuccessPage;

