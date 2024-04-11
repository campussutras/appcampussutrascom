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

const App = () => {
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
