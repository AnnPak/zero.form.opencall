import Header from "../header/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Home,
  ErrorPage,
  AfterSubmutSuccessPage,
  AfterSubmutFaildePage,
} from "../../pages";
import Footer from "../footer/footer";

import styles from "./app.module.scss";

function App() {
  
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ErrorPage />} />
            <Route path="/:userKey" element={<Home />} />
            <Route
              path="/success-submit"
              element={<AfterSubmutSuccessPage />}
            />
            <Route path="/failed-submit" element={<AfterSubmutFaildePage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
