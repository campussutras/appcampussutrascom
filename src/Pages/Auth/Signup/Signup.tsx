import React, { useState } from "react";
import "./style.css";
import { api } from "../../../Utils/Api";
import axios from "axios";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
import { Helmet } from "react-helmet";
const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const setLogin = useSetRecoilState(isLoginAtom);
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileType: "",
    institute: "",
    company: "",
    position: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Validate phone number length:
      if (signupData.phone.length !== 10) {
        const errorMessage = "Phone number must be 10 digits.";
        const errorContent = () => {
          messageApi.open({
            type: "error",
            content: errorMessage,
          });
        };
        errorContent();
        setLoading(false);
      } else {
        const response = await axios.post(api.signup, signupData, {
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
        setLoading(false);
        navigate("/assessments");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        // Access and display specific error message from server response
        const errorMessage =
          error.response.data.error || "Error registering user.";
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

  return (
    <section className="signup width100 flex alignCenter justifyCenter flexColumn">
      {contextHolder}
      <Helmet>
        <title>Sign Up - Campus Sutras</title>
        <meta
          name="description"
          content="Sign up for a Campus Sutras account to start your learning journey. Create your account today!"
        />
      </Helmet>
      <div className="signupContainer width95 maxWidth flex">
        <div className="signupRight width100 flex flexColumn alignCenter justifyCenter">
          <div className="signupForm width40">
            <div className="signupFormHead">
              <h1>Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <h3>
                Full Name<span>*</span>
              </h3>
              <input
                placeholder="ex. Harshit Kumar"
                type="text"
                name="name"
                onChange={handleChange}
                value={signupData.name}
              />
              <h3>
                Email<span>*</span>
              </h3>
              <input
                placeholder="ex. example@email.com"
                type="email"
                name="email"
                onChange={handleChange}
                value={signupData.email}
              />
              <h3>
                Phone<span>*</span>
              </h3>
              <input
                placeholder="ex. 9876543210"
                type="tel"
                name="phone"
                onChange={handleChange}
                value={signupData.phone}
              />
              <h3>
                Occupation<span>*</span>
              </h3>
              <div className="profileType flex marginBottom1 gap1">
                <div
                  className={`profile width50 flex alignCenter justifyCenter ${
                    signupData.profileType === "Student"
                      ? "profileSelected"
                      : null
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, profileType: "Student" })
                  }
                >
                  <h4>Student</h4>
                </div>
                <div
                  className={`profile width50 flex alignCenter justifyCenter ${
                    signupData.profileType === "Employee"
                      ? "profileSelected"
                      : null
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, profileType: "Employee" })
                  }
                >
                  <h4>Employee</h4>
                </div>
              </div>
              {signupData.profileType === "Employee" && (
                <>
                  <h3>
                    Company<span>*</span>
                  </h3>
                  <input
                    placeholder="ex. Campus Sutras Private Limited"
                    type="text"
                    name="company"
                    onChange={handleChange}
                    value={signupData.company}
                  />
                  <h3>
                    Position<span>*</span>
                  </h3>
                  <input
                    placeholder="ex. Sales Manager"
                    type="text"
                    name="position"
                    onChange={handleChange}
                    value={signupData.position}
                  />
                </>
              )}
              {signupData.profileType === "Student" && (
                <>
                  <h3>
                    Institute<span>*</span>
                  </h3>
                  <input
                    placeholder="Institute Name"
                    type="text"
                    name="institute"
                    onChange={handleChange}
                    value={signupData.institute}
                  />
                </>
              )}
              <h3>
                Password<span>*</span>
              </h3>
              <input
                placeholder="********"
                type="password"
                name="password"
                onChange={handleChange}
                value={signupData.password}
              />

              <button type="submit" style={{ display: "block" }}>
                {loading ? <span className="btnLoader"></span> : "Sign Up"}
              </button>
            </form>
            <p className="marginBottom1">
              Already have account - <Link to="/login">Login</Link>
            </p>
            <p>
              Forget Password -{" "}
              <Link to="/forget-password">Forget Password</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
