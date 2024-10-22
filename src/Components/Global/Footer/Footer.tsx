import "./style.css";
import logo from "../../../assets/media/assets/logo.png";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="width100 flex alignCenter justifyCenter flexColumn">
      <div className="footer width95 maxWidth flex alignStart spaceBtw ">
        <div className="footerLeft flex alignStart spaceBtw width31">
          <div className="footerTab">
            <h3>Pages</h3>
            <ul>
              <li>
                <a href="http://localhost:3000">Home</a>
              </li>

              <li>
                <a href="http://localhost:3000/about">About</a>
              </li>
              <li>
                <a href="http://localhost:3000/events">Events</a>
              </li>
              <li>
                <a href="http://localhost:3000/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footerTab">
            <h3>
              Platform <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
            </h3>
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
              <li>
                <a href="/assessments">Assessments </a>
              </li>
              <li>
                <a href="/hire-from-us">Hire From Us</a>
              </li>
            </ul>
          </div>
          <div className="footerTab">
            <h3>
              Social <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
            </h3>
            <ul>
              <li>
                <a href="https://www.linkedin.com/company/campussutras/">
                  <AiFillLinkedin style={{ marginBottom: "-0.18rem" }} />{" "}
                  Linkedin{" "}
                </a>
              </li>
              <li>
                <a href="https://facebook.com/campussutras">
                  <AiFillFacebook style={{ marginBottom: "-0.18rem" }} />{" "}
                  Facebook{" "}
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
          </div>
        </div>
        <div className="footerRight">
          <div className="footerTab">
            <div className="footerLogo">
              <a href="/" className="flex alignEnd justifyEnd">
                <img src={logo} alt="Campus Sutras Footer Logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footerLegal width95 maxWidth flex alignCenter spaceBtw">
        <div className="footerLContainer flex width45 spaceBtw">
          <a href="http://localhost:3000/privacy-and-policy">
            Privacy Policy <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
          <a href="http://localhost:3000/terms-and-conditions">
            Terms & Conditions{" "}
            <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
          <a href="http://localhost:3000/cookie-policy">
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
