
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './after-submit-failed.module.scss'

 const AfterSubmutFaildePage = () => {

    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        !location?.state?.userKey && navigate("/"); //редирект со страницы, если перешли не с формы
        // eslint-disable-next-line
    }, []);

    const goToForm = () => {
      location?.state?.prevPath && 
      window.location.replace(location?.state?.prevPath)
    } 

    return (
        <section className={styles.message}>
          <div className={styles.textBlock}>
              <p className={styles.title}>We were unable to send the form</p>
              <p className={styles.subtitle}>
              There seems to be a server-side error, wait a while and try again
              </p>
              <Button type="button" className={styles.buttonInfo} onClick={goToForm}>
                Try again
              </Button>
          </div>
      </section>
    );
};

export default AfterSubmutFaildePage;

