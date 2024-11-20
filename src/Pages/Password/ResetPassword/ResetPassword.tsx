import { useParams } from "react-router-dom";
import "./style.css";
import { message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { api } from "../../../Utils/Api";
const ResetPassword = () => {
  const { token } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(`${api.resetPassword}/${token}`);

      setLoading(true);
      const response = await axios.patch(
        `${api.resetPassword}/${token}`,
        newPassword,
        {
          withCredentials: true,
        }
      );
      const success = () => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      };
      success();
      console.log(response);
      setLoading(false);
      setNewPassword({
        newPassword: "",
      });
    } catch (error: any) {
      setLoading(false);
      setNewPassword({
        newPassword: "",
      });
      if (error.response) {
        // Access and display specific error message from server response
        const errorMessage =
          error.response.data.error || "Error in setting password.";
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
    setNewPassword({ ...newPassword, [name]: value });
  };
  return (
    <main className="changePassword width100 flex alignCenter justifyCenter flexColumn">
      {contextHolder}
      <div className="changePContainer width95 maxWidth flex alignCenter justifyCenter flexColumn">
        <div className="changePForm width40">
          <div className="changePFormHead">
            <h1>Reset Password</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <h3>New Password</h3>
            <input
              placeholder="********"
              type="password"
              name="newPassword"
              onChange={handleChange}
              value={newPassword.newPassword}
              required
            />

            <button type="submit">
              {loading ? <span className="btnLoader"></span> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
