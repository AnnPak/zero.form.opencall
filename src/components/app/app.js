import Header from "../header/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home, ErrorPage } from "../../pages";
import styles from "./app.module.scss";
import Footer from "../footer/footer";

function App() {
    return (
        <Router>
            <div className={styles.app}>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<ErrorPage />}/> 
                    <Route path="/:userKey" element={<Home />}/> 
                    <Route path="/error" element={<ErrorPage />}/> 
                  </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
