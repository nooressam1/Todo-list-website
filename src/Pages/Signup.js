import React, { useState, useEffect } from "react";
import "../Css files/Login.css";

import TextinputBlue from "../Components/TextinputBlue";
import BlueButton from "../Components/BlueButton";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const Signup = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  AOS.init();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return
    }
    try {
      const response = await axios.post("http://localhost:5003/register", {
        userName,
        email,
        passWord,
      });
      navigate("/"); // Redirect on success
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error); // Show the error message
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="MainBackgroundImage">
      <div className="AlignContentDiv">
        <div>
          <p className="WelcomeBackTextStyle" data-aos="fade-right">
            Welcome
          </p>
          <p
            className="WelcomeBackTextStyle"
            style={{
              fontSize: "1.5vw",
              fontWeight: "500",
              marginTop: "-2%",
              marginLeft: "3%",
            }}
            data-aos="fade-right"
          >
            Lets get started
          </p>
        </div>
        <div className="DetailsBoxContainer" data-aos="fade-left">
          <div style={{ textAlign: "center", width: "100%", marginTop: "8%" }}>
            <h1 className="LoginTextStyle">Signup</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "grid",
              gap: "5%",
              marginTop: "2%",
              placeItems: "center" /* Centers the child div */,
            }}
          >
            <TextinputBlue
              TextinputTitle="UserName"
              TextinputText="UserName"
              setValue={setUserName}
            ></TextinputBlue>

            <TextinputBlue
              TextinputTitle="Email"
              TextinputText="Email"
              setValue={setEmail}
            ></TextinputBlue>

            <TextinputBlue
              TextinputTitle="Password"
              TextinputText="Password"
              setValue={setPassWord}
            ></TextinputBlue>

            <BlueButton Title="Signup" type="submit" />
            {error && <p className="error">{error}</p>}

            <h1 className="SmallerTextStyles" style={{ width: "80%" }}>
              Already have an account?{" "}
              <Link to="/" style={{ color: "#4477ca" }}>
                Login
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
