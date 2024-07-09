import { useState } from "react";
import "./style.css";
import axios from "axios";
import { message } from "antd";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Utils/Api";
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
      console.log(response);
      setUser(response.data.data);
      setLogin(true);
      setLoginData({
        email: "",
        password: "",
      });
      setLoading(false);
      navigate("/assessments");
    } catch (e) {
      const error = () => {
        messageApi.open({
          type: "error",
          content: "Error | Try again after sometime.",
        });
      };
      error();
      setLoading(false);
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <section className="login width100 flex alignCenter justifyCenter flexColumn">
      {contextHolder}
      <div className="loginContainer width95 maxWidth flex">
        <div className="loginRight width100 flex flexColumn alignCenter justifyCenter">
          <div className="loginForm width40">
            <div className="loginFormHead">
              <h2>Login to Campus Sutras</h2>
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
                {loading ? "Logging..." : "Login"}
              </button>
            </form>
            <p className="marginBottom1">
              Don't have account - <a href="">Sign Up</a>
            </p>
            <p>
              Forget Password - <a href="">Forget Password</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
