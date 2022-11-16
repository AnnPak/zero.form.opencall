import Header from '../header/header';
import Form from '../form/form';

import styles from './app.module.scss';


function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
