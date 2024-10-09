import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { message } from "antd";
import { api } from "../../../Utils/Api";
const ForgetPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.patch(api.forgetPassword, email, {
        withCredentials: true,
      });
      const success = () => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      };
      success();
      setEmail({
        email: "",
      });
    } catch (error: any) {
      setLoading(false);
      setEmail({
        email: "",
      });
      if (error.response) {
        // Access and display specific error message from server response
        const errorMessage =
          error.response.data.error || "Error occurs | Try Again.";
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

    setEmail({
      email: "",
    });

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };
  return (
    <>
      <main className="fp flex alignCenter justifyCenter">
        {contextHolder}
        <section className="fpContainer width95 maxWidth flex">
          <div className="fpRight width100 flex flexColumn alignCenter justifyCenter">
            <div className="fpForm width40">
              <div className="fpFormHead">
                <h1>Forget Password</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <h3>Email</h3>
                <input
                  placeholder="ex. example@email.com"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={email.email}
                  required
                />

                <button type="submit" style={{ display: "block" }}>
                  {loading ? "Sending Link..." : "Submit"}
                </button>
              </form>
              <p className="marginBottom1">
                Don't have account - <a href="/signup">Sign Up</a>
              </p>
              <p>
                Already account - <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgetPassword;
