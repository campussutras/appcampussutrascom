import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
import { message } from "antd";

const ChangePassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(isLoginAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [changePData, setChangePData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:3001/api/v1/user/change-password`,
        changePData,
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
      setAuth(false);
      setUser({});
      setLoading(false);
      navigate("/login");
    } catch (e) {
      const error = () => {
        messageApi.open({
          type: "error",
          content: "Error | Try again after sometime.",
        });
      };
      error();
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChangePData({ ...changePData, [name]: value });
  };
  return (
    <>
      <main className="changePassword width100 flex alignCenter justifyCenter flexColumn">
        {contextHolder}
        <div className="changePContainer width95 maxWidth flex alignCenter justifyCenter flexColumn">
          <div className="changePForm width40">
            <div className="changePFormHead">
              <h2>Change Password</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <h3>Current Password</h3>
              <input
                placeholder="********"
                type="password"
                name="oldPassword"
                onChange={handleChange}
                value={changePData.oldPassword}
                required
              />
              <h3>New Password</h3>
              <input
                placeholder="********"
                type="password"
                name="newPassword"
                onChange={handleChange}
                value={changePData.newPassword}
                required
              />
              <h3>Confirm New Password</h3>
              <input placeholder="********" type="password" required />
              <button type="submit">
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChangePassword;
