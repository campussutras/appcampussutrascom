import "./style.css";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/media/assets/logo.png";
import { FiArrowRight } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
import { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";
import { campussutrasComUrl } from "../../../Utils/routes";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const user = useRecoilValue(userAtom);

  const isLogin = useRecoilValue(isLoginAtom);

  const menuClick = () => {
    navigator.vibrate(100);
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  return (
    <nav className="width100 flex alignCenter justifyCenter">
      <div
        className={`navContainer width95 maxWidth flex alignCenter spaceBtw ${
          location.pathname === "/assessments" ? "" : "navContainerBorder"
        }`}
      >
        <div className="navLogo">
          <a href={campussutrasComUrl}>
            <img src={logo} alt="Campus Sutras Logo" />
          </a>
        </div>
        <div
          className={`mainMenu flex alignCenter gap2 ${
            showMenu ? "showNav" : ""
          }`}
        >
          <ul className="flex gap2">
            <li>
              <a href={campussutrasComUrl}>Home</a>
            </li>

            <li>
              <a href="/assessments">Assessments</a>
            </li>
            <li>
              <a href={`${campussutrasComUrl}/internship`}>Internship</a>
            </li>
            <li>
              <a href={`${campussutrasComUrl}/courses`}>Courses</a>
            </li>
            <li>
              <a href={`${campussutrasComUrl}/events`}>Events</a>
            </li>
            <li>
              <a href={`${campussutrasComUrl}/about`}>About</a>
            </li>
            <li className="navDivider">|</li>
            {!isLogin ? (
              <li>
                <a href="/login">Login</a>
              </li>
            ) : (
              <li>
                <a href="/profile">{user.name}</a>
              </li>
            )}
            {!isLogin ? (
              <li className="navSignupBtn">
                <a href="/signup">Signup</a>
              </li>
            ) : null}
          </ul>
          <a href={`${campussutrasComUrl}/contact`} className="mMenus">
            Contact <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
          <ul className="mMenus">
            <li>
              <a href="https://www.linkedin.com/company/campussutras/">
                <AiFillLinkedin style={{ marginBottom: "-0.18rem" }} /> Linkedin{" "}
              </a>
            </li>
            <li>
              <a href="https://facebook.com/campussutras">
                <AiFillFacebook style={{ marginBottom: "-0.18rem" }} /> Facebook{" "}
              </a>
            </li>
            <li>
              <a href="https://instagram.com/campussutras">
                <AiFillInstagram style={{ marginBottom: "-0.18rem" }} />{" "}
                Instagram{" "}
              </a>
            </li>
            <li>
              <a href="https://twitter.com/campussutras">
                <AiFillTwitterSquare style={{ marginBottom: "-0.18rem" }} /> X{" "}
                {`(Twitter)`}{" "}
              </a>
            </li>
          </ul>
          <ul className="mMenus mLegal">
            <li>
              <a href={`${campussutrasComUrl}/privacy-and-policy`}>
                Privacy Policy{" "}
                <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
              </a>
            </li>
            <li>
              <a href={`${campussutrasComUrl}/terms-and-conditions`}>
                Terms & Conditions{" "}
                <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
              </a>
            </li>
            <li>
              <a href={`${campussutrasComUrl}/cookie-policy`}>
                Cookie Policy{" "}
                <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
              </a>
            </li>
          </ul>
        </div>
        <div className="pMenuBtn mMenus">
          {!showMenu ? (
            <RiMenuFill
              onClick={menuClick}
              style={{ marginBottom: "-0.25rem" }}
            />
          ) : (
            <RiCloseFill
              onClick={menuClick}
              style={{ marginBottom: "-0.25rem" }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
