import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { isLoginAtom, userAtom, authLoadingAtom } from "./store/atoms/userAtom";
import MyAssessments from "./Pages/MyAssessments/MyAssessments";
import Assessment from "./Pages/Assessment/Assessment";
import { api } from "./Utils/Api";
import NotFound from "./Pages/NotFound";
import UpdateUser from "./Pages/Auth/UpdateUser/UpdateUser";
import ResetPassword from "./Pages/Password/ResetPassword/ResetPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail/VerifyEmail";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import UnProtectedRoute from "./Utils/UnProtectedRoutes";

const App = () => {
  const setUser = useSetRecoilState(userAtom);
  const setAuth = useSetRecoilState(isLoginAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const setAuthLoading = useSetRecoilState(authLoadingAtom);
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
    } finally {
      setAuthLoading(false);
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
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route
            path="/login"
            element={<UnProtectedRoute element={<Login />} />}
          />
          <Route
            path="/signup"
            element={<UnProtectedRoute element={<Signup />} />}
          />
          <Route path="/assessments" element={<Assessments />} />
          {/* user routes */}
          <Route
            path="/change-password"
            element={<ProtectedRoute element={<ChangePassword />} />}
          />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/my-assessments"
            element={<ProtectedRoute element={<MyAssessments />} />}
          />
          <Route path="/assessments-data" element={<AssessmentsData />} />
          <Route path="*" element={<NotFound />} />
          {/* admin routes */}
          <Route path="/user-assessments/:id" element={<GetAssessments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
          <Route
            path="/assessment/:assessmentName"
            element={<ProtectedRoute element={<Assessment />} />}
          />
          <Route
            path="update"
            element={<ProtectedRoute element={<UpdateUser />} />}
          />
          <Route path="/verify/:token" element={<VerifyEmail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
