import "./style.css";
import { Link, useLocation } from "react-router-dom";
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
          <Link to={`${import.meta.env.VITE_COM_URL}`}>
            <img src={logo} alt="Campus Sutras Logo" />
          </Link>
        </div>
        <div className="mainMenu flex alignCenter gap2">
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
            {/* {user && user.isAdmin ? (
              <li>
                <a href="/users">Users</a>
              </li>
            ) : null} */}
            <li>
              <Link to="/assessments">Assessments</Link>
            </li>
            <li>
              <Link to="http://localhost:3000/events">Events</Link>
            </li>
            <li>
              <Link to="http://localhost:3000/about">About</Link>
            </li>
          </ul>
          <Link to={`${import.meta.env.VITE_COM_URL}/contact`}>
            Contact <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
