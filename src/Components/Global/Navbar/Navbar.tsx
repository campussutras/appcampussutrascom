import "./style.css";
import { Link, useLocation } from "react-router-dom";
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
          <Link to={`${import.meta.env.VITE_COM_URL}`}>
            <img src={logo} alt="Campus Sutras Logo" />
          </Link>
        </div>
        <div
          className={`mainMenu flex alignCenter gap2 ${
            showMenu ? "showNav" : ""
          }`}
        >
          <ul className="flex gap2">
            {!isLogin ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li>
                <Link to="/profile">{user.name}</Link>
              </li>
            )}

            <li>
              <Link to="/assessments">Assessments</Link>
            </li>
            <li>
              <Link to={`${import.meta.env.VITE_COM_URL}/events`}>Events</Link>
            </li>
            <li>
              <Link to={`${import.meta.env.VITE_COM_URL}/about`}>About</Link>
            </li>
          </ul>
          <Link to={`${import.meta.env.VITE_COM_URL}/contact`}>
            Contact <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </Link>
          <ul className="mMenus">
            <li>
              <Link to="https://www.linkedin.com/company/campussutras/">
                <AiFillLinkedin style={{ marginBottom: "-0.18rem" }} /> Linkedin{" "}
              </Link>
            </li>
            <li>
              <Link to="https://facebook.com/campussutras">
                <AiFillFacebook style={{ marginBottom: "-0.18rem" }} /> Facebook{" "}
              </Link>
            </li>
            <li>
              <Link to="https://instagram.com/campussutras">
                <AiFillInstagram style={{ marginBottom: "-0.18rem" }} />{" "}
                Instagram{" "}
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com/campussutras">
                <AiFillTwitterSquare style={{ marginBottom: "-0.18rem" }} /> X{" "}
                {`(Twitter)`}{" "}
              </Link>
            </li>
          </ul>
          <ul className="mMenus mLegal">
            <li>
              <Link to={`${import.meta.env.VITE_COM_URL}/privacy-and-policy`}>
                Privacy Policy{" "}
                <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
              </Link>
            </li>
            <li>
              <Link to={`${import.meta.env.VITE_COM_URL}/terms-and-conditions`}>
                Terms & Conditions{" "}
                <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
              </Link>
            </li>
            <li>
              <Link to={`${import.meta.env.VITE_COM_URL}/cookie-policy`}>
                Cookie Policy{" "}
                <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
              </Link>
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
