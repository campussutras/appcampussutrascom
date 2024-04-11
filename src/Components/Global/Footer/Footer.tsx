import "./style.css";
import logo from "../../../../public/media/assets/logo.png";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="width100 flex alignCenter justifyCenter flexColumn">
      <div className="footer width95 maxWidth flex alignStart spaceBtw">
        <div className="footerLeft flex alignStart spaceBtw width31">
          <div className="footerTab">
            <h3>Pages</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>

              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Events</a>
              </li>
              <li>
                <a href="/">Blogs</a>
              </li>
            </ul>
          </div>
          <div className="footerTab">
            <h3>
              Platform <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
            </h3>
            <ul>
              <li>
                <a href="/">Login</a>
              </li>
              <li>
                <a href="/">Signup</a>
              </li>
              <li>
                <a href="/">Assessments </a>
              </li>
            </ul>
          </div>
          <div className="footerTab">
            <h3>
              Social <FiArrowUpRight style={{ marginBottom: "-0.18rem" }} />
            </h3>
            <ul>
              <li>
                <a href="/">Linkedin </a>
              </li>
              <li>
                <a href="/">Facebook </a>
              </li>
              <li>
                <a href="/">Instagram </a>
              </li>
              <li>
                <a href="/">X {`(Twitter)`} </a>
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
        <div className="footerLContainer flex width31 spaceBtw">
          <a href="/">
            Privacy Policy <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
          </a>
          <a href="/">
            Terms & Conditions{" "}
            <FiArrowRight style={{ marginBottom: "-0.18rem" }} />
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
