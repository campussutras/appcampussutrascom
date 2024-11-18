import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Signup/Signup";
import Assessments from "./Pages/Assessments/Assessments";
import ChangePassword from "./Pages/Password/ChangePassword/ChangePassword";
import ForgetPassword from "./Pages/Password/ForgetPassword/ForgetPassword";
import Profile from "./Pages/Profile/Profile";
import GetAssessments from "./Pages/Admin/Assessments/GetAssessments";
import Users from "./Pages/Admin/Users/Users";
import User from "./Pages/Admin/User/User";
import Navbar from "./Components/Global/Navbar/Navbar";
import Footer from "./Components/Global/Footer/Footer";
import AssessmentsData from "./Pages/AssessmentsData/AssessmentsData";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "./store/atoms/userAtom";
import MyAssessments from "./Pages/MyAssessments/MyAssessments";
import Assessment from "./Pages/Assessment/Assessment";
import { api } from "./Utils/Api";
import NotFound from "./Pages/NotFound";
import UpdateUser from "./Pages/Auth/UpdateUser/UpdateUser";
import ResetPassword from "./Pages/Password/ResetPassword/ResetPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail/VerifyEmail";

const App = () => {
  const setUser = useSetRecoilState(userAtom);
  const setAuth = useSetRecoilState(isLoginAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const getUser = async () => {
    try {
      const response = await axios.get(api.profile, {
        withCredentials: true,
      });
      if (response) {
        setUser(response.data.data);
        setAuth(true);
        console.log(isLogin);
      } else {
        console.log("No login data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* common routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/assessments" element={<Assessments />} />
          {/* user routes */}
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-assessments" element={<MyAssessments />} />
          <Route path="/assessments-data" element={<AssessmentsData />} />
          <Route path="*" element={<NotFound />} />
          {/* admin routes */}
          <Route path="/user-assessments/:id" element={<GetAssessments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/assessment/:assessmentName" element={<Assessment />} />
          <Route path="update" element={<UpdateUser />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
