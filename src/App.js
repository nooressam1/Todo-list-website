import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/Pages/Login.js";
import SignupPage from "../src/Pages/Signup.js";
import HomePage from "../src/Pages/Home.js";
import PrivateRoute from "./PrivateRoute.js";
import AuthProvider from "../src/Context/AuthContext.js";
import { TaskProvider } from "../src/Context/TaskContext";
import { ThemeProvider } from "../src/Context/ThemeContext.js";
import { DeleteProvider } from "../src/Context/DeleteContext.js";

function App() {
  return (
    <Router> {/* ✅ Moved Router to the top */}
      <AuthProvider> 
        <ThemeProvider>
          <TaskProvider>
            <DeleteProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                <Route element={<PrivateRoute />}>
                  <Route path="/Home" element={<HomePage />} />
                </Route>
              </Routes>
            </DeleteProvider>
          </TaskProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
