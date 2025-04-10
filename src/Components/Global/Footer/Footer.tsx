import "./style.css";
import logo from "../../../assets/media/assets/logo.png";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { userAtom } from "../../../store/atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { campussutrasComUrl } from "../../../Utils/routes";
const Footer = () => {
  const user = useRecoilValue(userAtom);
  return (
    <footer className="width100 flex alignCenter justifyCenter flexColumn">
      <div className="footer width95 maxWidth flex alignStart spaceBtw ">
        <div className="footerLeft flex alignStart spaceBtw width31">
          <div className="footerTab">
            <h3>Pages</h3>
            <ul>
              <li>
                <Link to={campussutrasComUrl}>Home</Link>
              </li>

              <li>
                <Link to={`${campussutrasComUrl}/about`}>About</Link>
              </li>
              <li>
                <Link to={`${campussutrasComUrl}/events`}>Events</Link>
              </li>
              <li>
                <Link to={`${campussutrasComUrl}/contact`}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footerTab">
            <h3>
              Platform <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
            </h3>
            <ul>
              {user && user.name ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}

              <li>
                <Link to="/assessments">Assessments </Link>
              </li>
              <li>
                <Link to={`${campussutrasComUrl}/courses`}>Courses</Link>
              </li>
            </ul>
          </div>
          <div className="footerTab">
            <h3>
              Social <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
            </h3>
            <ul>
              <li>
                <Link to="https://www.linkedin.com/company/campussutras/">
                  <AiFillLinkedin style={{ marginBottom: "-0.18rem" }} />{" "}
                  Linkedin{" "}
                </Link>
              </li>
              <li>
                <Link to="https://facebook.com/campussutras">
                  <AiFillFacebook style={{ marginBottom: "-0.18rem" }} />{" "}
                  Facebook{" "}
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
          </div>
        </div>
        <div className="footerRight">
          <div className="footerTab">
            <div className="footerLogo">
              <Link to="/" className="flex alignEnd justifyEnd">
                <img src={logo} alt="Campus Sutras Footer Logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footerLegal width95 maxWidth flex alignCenter spaceBtw">
        <div className="footerLContainer flex width45 spaceBtw">
          <a href={`${campussutrasComUrl}/privacy-and-policy`}>
            Privacy Policy <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
          <a href={`${campussutrasComUrl}/terms-and-conditions`}>
            Terms & Conditions{" "}
            <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
          <a href={`${campussutrasComUrl}/cookie-policy`}>
            Cookie Policy <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
        </div>
        <div className="footerLEmail">
          <a href="mailto:info@campussutras.com">
            info@campussutras.com{" "}
            <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
          </a>
        </div>
      </div>
      <div className="footerCopyright width95 maxWidth">
        <p>© 2024 Campus Sutras Private Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
