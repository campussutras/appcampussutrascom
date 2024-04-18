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
// import { useEffect } from "react";
// import axios from "axios";
// import { useSetRecoilState } from "recoil";
// import { userAtom } from "./store/atoms/userAtom";

const App = () => {
  // const setUser = useSetRecoilState(userAtom);
  // const getUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`
  //     );
  //     if (response.data.status === 200) {
  //       setUser(response.data);
  //     } else {
  //       console.log("not login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/assessments-data" element={<AssessmentsData />} />
          {/* admin routes */}
          <Route path="/users-assessments" element={<GetAssessments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user" element={<User />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
