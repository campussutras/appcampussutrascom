import "./style.css";
import logo from "../../../assets/media/assets/logo.png";
import { FiArrowRight } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../../store/atoms/userAtom";
const Navbar = () => {
  const user = useRecoilValue(userAtom);
  return (
    <nav className="width100 flex alignCenter justifyCenter">
      <div className="navContainer width95 maxWidth flex alignCenter spaceBtw">
        <div className="navLogo">
          <img src={logo} alt="Campus Sutras Logo" />
        </div>
        <div className="mainMenu flex alignCenter gap2">
          <ul className="flex gap2">
            <li>
              <a href="/">Courses</a>
            </li>
            {user ? <li>{user?.name}</li> : null}
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/">Assessments</a>
            </li>
            <li>
              <a href="/">Events</a>
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
