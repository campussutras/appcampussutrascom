import { FcOk } from "react-icons/fc";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../Utils/Api";
import { useEffect, useState } from "react";
const VerifyEmail = () => {
  let { token } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const verifyEmail = async () => {
    const errorMessage = "Invalid token or verification link has expired.";
    try {
      await axios.patch(`${api.verifyEmail}/${token}`);
      setIsVerified(true);
    } catch (error) {
      console.error("Error verifying email:", error);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);
  return (
    <main className="verifyEmail width100 flex alignCenter justifyCenter">
      <section className="vEmailContainer flex alignCenter justifyCenter width95 maxWidth">
        <div className="vSuccess width100 flex alignCenter justifyCenter">
          {isVerified ? (
            <>
              <h1>
                <FcOk className="verifyIcon" /> Your email has been verified
              </h1>
              <p>
                Thank you for validating your e-mail address, you can continue
                to signin on Campus Sutras
              </p>
            </>
          ) : (
            <p>{error || "Verifying email..."}</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
