import "./style.css";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/media/assets/logo.png";
import { FiArrowRight } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../../store/atoms/userAtom";
const Navbar = () => {
  const location = useLocation();

  const user = useRecoilValue(userAtom);
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    <nav className="width100 flex alignCenter justifyCenter">
      <div
        className={`navContainer width95 maxWidth flex alignCenter spaceBtw ${
          location.pathname === "/assessments" ? "" : "navContainerBorder"
        }`}
      >
        <div className="navLogo">
          <a href="http://localhost:3000">
            <img src={logo} alt="Campus Sutras Logo" />
          </a>
        </div>
        <div className="mainMenu flex alignCenter gap2">
          <ul className="flex gap2">
            {!isLogin ? (
              <li>
                <a href="/login">Login</a>
              </li>
            ) : (
              <li>
                <a href="/profile">{user.name}</a>
              </li>
            )}

            <li>
              <a href="/assessments">Assessments</a>
            </li>
            <li>
              <a href="https://localhost:3000/events">Events</a>
            </li>
            <li>
              <a href="/https://localhost:3000/about">About</a>
            </li>
          </ul>
          <a href="/">
            Contact <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
