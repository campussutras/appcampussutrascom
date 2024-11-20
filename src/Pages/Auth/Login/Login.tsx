import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { message } from "antd";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../Utils/Api";
import { Helmet } from "react-helmet";
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const setLogin = useSetRecoilState(isLoginAtom);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(api.login, loginData, {
        withCredentials: true,
      });
      const success = () => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      };
      success();
      setUser(response.data.data);
      setLogin(true);
      setLoginData({
        email: "",
        password: "",
      });
      setLoading(false);
      navigate("/assessments");
    } catch (error: any) {
      setLoading(false);
      setLoginData({
        email: "",
        password: "",
      });
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
          messageApi.open({
            type: "error",
            content: "An unexpected error occurred. Please try again later.",
          });
        };
        errorContent();
      }
    }
  };

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
