import Header from "../header/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, ErrorPage } from "../../pages";
import styles from "./app.module.scss";

function App() {
    return (
        <Router>
            <div className={styles.app}>
                <Header />
                <main>
                  <Routes>
                    <Route path="/:userKey" element={<Home />}/> 
                    <Route path="/error" element={<ErrorPage />}/> 
                  </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
