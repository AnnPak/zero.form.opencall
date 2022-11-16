import Header from '../header/header';
import Form from '../form/form';

import styles from './app.module.scss';


function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
