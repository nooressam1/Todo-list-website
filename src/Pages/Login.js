import React, { useState, useEffect, useContext } from "react";
import "../Css files/Login.css";
import TextinputBlue from "../Components/TextinputBlue";
import Checkbox from "../Components/Checkbox";
import BlueButton from "../Components/BlueButton";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../Context/AuthContext.js";

import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login,token } = useContext(AuthContext);



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5003/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.token);

        if (rememberMe) {
          localStorage.setItem("token", data.token); // ✅ Persistent storage
          localStorage.setItem("userName", decoded.userName);
        } else {
          sessionStorage.setItem("token", data.token); // ✅ Temporary storage (clears on browser close)
          sessionStorage.setItem("userName", decoded.userName);
        }

        login(data.token, rememberMe);

        navigate("/Home");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="MainBackgroundImage">
      <div className="AlignContentDiv">
        <h1 className="WelcomeBackTextStyle" data-aos="fade-right">
          Welcome <br /> back
        </h1>
        <div className="DetailsBoxContainer" data-aos="fade-left">
          <div style={{ textAlign: "center", width: "100%", marginTop: "8%" }}>
            <h1 className="LoginTextStyle">Login</h1>
            <h1 className="SmallerTextStyles">Please login to your account</h1>
          </div>
          <form
            style={{
              width: "100%",
              display: "grid",
              gap: "5%",
              marginTop: "2%",
              position: "relative",
              placeItems: "center",
            }}
            onSubmit={handleLogin}
          >
            <TextinputBlue
              TextinputTitle="Email"
              TextinputText="Email"
              setValue={setEmail}
            />
            <TextinputBlue
              TextinputTitle="Password"
              TextinputText="Password"
              setValue={setPassword}
            />
            <Checkbox
              name="remember"
              value="remember"
              title="Remember me?"
              Change={setRememberMe}
            />
            {error && <p className="error">{error}</p>}

            <BlueButton Title="Login" type="submit" />

            <h1 className="SmallerTextStyles" style={{ width: "80%" }}>
              Don't have an account?{" "}
              <Link to="/SignUp" style={{ color: "#4477ca" }}>
                Sign up
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
