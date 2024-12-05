import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { message } from "antd";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../Utils/Api";
import { Helmet } from "react-helmet";
import ValidateEmail from "../../../Utils/EmailValidator";
const Login = () => {
  // State for displaying error/success messages
  const [messageApi, contextHolder] = message.useMessage();

  // Function to navigate to different routes
  const navigate = useNavigate();

  // Functions to update user and login state in Recoil
  const setUser = useSetRecoilState(userAtom);
  const setLogin = useSetRecoilState(isLoginAtom);

  // State for loading indicator during API requests
  const [loading, setLoading] = useState(false);

  // State to store user input for email and password
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email address
    if (!ValidateEmail(loginData.email)) {
      messageApi.open({
        type: "error",
        content: "Please enter a valid email address.",
      });
      return; // Prevent form submission if email is invalid
    }
    try {
      setLoading(true); // Show loading indicator

      // Send a POST request to the login API endpoint
      const response = await axios.post(api.login, loginData, {
        withCredentials: true, // Include cookies for authentication
      });

      // Display a success message
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      // Update user and login state in Recoil
      setUser(response.data.data);
      setLogin(true);

      // Clear form fields
      setLoginData({
        email: "",
        password: "",
      });
      setLoading(false);
      navigate("/assessments"); // Navigate to assessments page
    } catch (error: any) {
      setLoading(false);
      setLoginData({
        email: "",
        password: "",
      }); // Clear form fields on error

      // Handle different error scenarios
      if (error.response) {
        // Access and display specific error message from server response
        const errorMessage = error.response.data.error || "Error logging in.";
        const errorContent = () => {
          messageApi.open({
            type: "error",
            content: errorMessage,
          });
        };
        errorContent();
      } else if (error.request) {
        // Handle network or request issues
        console.error("Network error:", error.request);
        const errorContent = () => {
          messageApi.open({
            type: "error",
            content:
              "Network error. Please check your connection and try again.",
          });
        };
        errorContent();
      } else {
        // Handle other errors (e.g., setting up the request)
        console.error("Other error:", error.message);
        const errorContent = () => {
          // Other errors
          messageApi.open({
            type: "error",
            content: "An unexpected error occurred. Please try again later.",
          });
        };
        errorContent();
      }
    }
  };

  // Function to handle changes in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <main className="login width100 flex alignCenter justifyCenter flexColumn">
      {contextHolder}
      <Helmet>
        <title>Login - Campus Sutras</title>
        <meta
          name="description"
          content="Login to your Campus Sutras account to access your personalized learning experience."
        />
      </Helmet>
      <section className="loginContainer width95 maxWidth flex">
        <div className="loginRight width100 flex flexColumn alignCenter justifyCenter">
          <div className="loginForm width40">
            <div className="loginFormHead">
              <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <h3>Email</h3>
              <input
                placeholder="ex. example@email.com"
                type="email"
                name="email"
                onChange={handleChange}
                value={loginData.email}
                required
              />
              <h3>Password</h3>
              <input
                placeholder="********"
                type="password"
                name="password"
                onChange={handleChange}
                value={loginData.password}
                required
              />
              <button type="submit" style={{ display: "block" }}>
                {loading ? <span className="btnLoader"></span> : "Login"}
              </button>
            </form>
            <p className="marginBottom1">
              Don't have account - <Link to="/signup">Sign Up</Link>
            </p>
            <p>
              Forget Password -{" "}
              <Link to="/forget-password">Forget Password</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
