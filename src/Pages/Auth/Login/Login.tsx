import { useState } from "react";
import "./style.css";
import axios from "axios";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    withCredentials: true, // Include cookies in cross-site requests
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post(`/admin/login`, loginData);
      console.log(response.data);
      setLoginData({
        email: "",
        password: "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
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
