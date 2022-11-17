import Header from '../header/header';
import FormContainer from '../form/form';

import styles from './app.module.scss';


function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <FormContainer />
      </main>
    </div>
  );
}

export default App;
