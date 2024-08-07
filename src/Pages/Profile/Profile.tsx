import { useRecoilState, useSetRecoilState } from "recoil";
import "./style.css";
import { isLoginAtom, userAtom } from "../../store/atoms/userAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../Utils/Api";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const setAuth = useSetRecoilState(isLoginAtom);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get(api.logout, {
        withCredentials: true,
      });
      setAuth(false);
      setUser({});
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section className="myProfile width100 flex alignCenter justifyCenter flexColumn">
      <div className="myProfileContainer maxWidth width95">
        <h1>{user && user.name ? user.name : "Loading..."}</h1>
        <div className="myProfileInfo">
          <div className="myProfileTab flex alignStart justifyStart ">
            <div className="myProfileLeft">
              <h3>Email</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.email ? user.email : "Loading..."}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Phone</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.phone ? user.phone : "Loading..."}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Assessments</h3>
            </div>
            <div className="myProfileRight">
              <p>
                {user && user.assessments?.length > 0
                  ? user.assessments?.length
                  : "0"}
              </p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Profile Type</h3>
            </div>
            <div className="myProfileRight">
              <p>
                {user && user.profileType ? user.profileType : "Loading..."}
              </p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Company</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.company ? user.company : "Not Yet Updated"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Position</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.position ? user.position : "Not Yet Updated"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Address</h3>
            </div>
            <div className="myProfileRight">
              <p>
                {user && user.localAddress
                  ? user.localAddress
                  : "Not Yet Updated"}
              </p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>City</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.city ? user.city : "Not Yet Updated"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Zip</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.zip ? user.zip : "Not Yet Updated"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>State</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.state ? user.state : "Not Yet Updated"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Country</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.country ? user.country : "Not Yet Updated"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Verified</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.isVerified ? "Verified" : "Not Verified"}</p>
            </div>
          </div>
        </div>
        <div className="myProfileButtons flex gap05">
          <button className="myProfileLogout" onClick={logout}>
            {loading ? "Logging Out..." : "Logout"}
          </button>
          {user.assessments?.length > 0 ? (
            <>
              <a href="/my-assessments" className="myProfileChangePassword">
                My Assessments
              </a>
            </>
          ) : null}

          <button className="myProfileUpdate">Update Profile</button>
          <a href="/change-password" className="myProfileChangePassword">
            Change Password
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
