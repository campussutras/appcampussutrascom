import { useRecoilState, useSetRecoilState } from "recoil";
import "./style.css";
import { isLoginAtom, userAtom } from "../../store/atoms/userAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../Utils/Api";
import { message } from "antd";
import Vibrate from "../../Utils/Vibrate";
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileType: string;
  institute?: string; // Optional property
  course?: string;
  company?: string; // Optional property
  position?: string; // Optional property
  localAddress?: string; // Optional property
  city?: string; // Optional property
  zip?: string; // Optional property
  state?: string; // Optional property
  country?: string; // Optional property
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: string; // ISO 8601 format
  assessments: Assessment[]; // Array of assessment objects
}

interface Assessment {
  id: string;
}
const Profile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [vLoading, setVLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  console.log(user);
  const sendVCode = async () => {
    try {
      setVLoading(true);
      const response = await axios.patch(
        `${api.sendVerificationCode}`,
        { email: user.email },
        {
          withCredentials: true,
        }
      );
      const success = () => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      };
      success();
      setVLoading(false);
    } catch (error: any) {
      setVLoading(false);
      if (error.response) {
        // Access and display specific error message from server response
        const errorMessage = error.response.data.error || "Error logging in.";
        const errorContent = () => {
          messageApi.open({
            type: "error",
            content: errorMessage,
          });
        };
        errorContent();
      } else if (error.request) {
        // Handle network or request issues
        console.error("Network error:", error.request);
        const errorContent = () => {
          messageApi.open({
            type: "error",
            content:
              "Network error. Please check your connection and try again.",
          });
        };
        errorContent();
      } else {
        // Handle other errors (e.g., setting up the request)
        console.error("Other error:", error.message);
        const errorContent = () => {
          messageApi.open({
            type: "error",
            content: "An unexpected error occurred. Please try again later.",
          });
        };
        errorContent();
      }
    }
  };
  const setAuth = useSetRecoilState(isLoginAtom);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get(api.logout, {
        withCredentials: true,
      });
      setAuth(false);
      setUser({} as User);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="myProfile width100 flex alignCenter justifyCenter flexColumn">
      {contextHolder}
      <div className="myProfileContainer maxWidth width95">
        <h1>
          {user && user.name ? user.name : "Loading..."}{" "}
          {user.isAdmin ? <span>(Admin)</span> : ""}
        </h1>
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
          {user && user.profileType === "Employee" ? (
            <>
              <div className="myProfileTab flex alignStart justifyStart">
                <div className="myProfileLeft">
                  <h3>Company</h3>
                </div>
                <div className="myProfileRight">
                  <p>{user && user.company ? user.company : "Add Company"}</p>
                </div>
              </div>
              <div className="myProfileTab flex alignStart justifyStart">
                <div className="myProfileLeft">
                  <h3>Position</h3>
                </div>
                <div className="myProfileRight">
                  <p>
                    {user && user.position ? user.position : "Set Position"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="myProfileTab flex alignStart justifyStart">
                <div className="myProfileLeft">
                  <h3>Institute</h3>
                </div>
                <div className="myProfileRight">
                  <p>
                    {user && user.institute ? user.institute : "Add Institute"}
                  </p>
                </div>
              </div>
              <div className="myProfileTab flex alignStart justifyStart">
                <div className="myProfileLeft">
                  <h3>Course</h3>
                </div>
                <div className="myProfileRight">
                  <p>{user && user.course ? user.course : "Set Course"}</p>
                </div>
              </div>
            </>
          )}

          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Address</h3>
            </div>
            <div className="myProfileRight">
              <p>
                {user && user.localAddress ? user.localAddress : "Set Address"}
              </p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>City</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.city ? user.city : "Add City"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Zip</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.zip ? user.zip : "Add Postal Code"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>State</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.state ? user.state : "Add State"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Country</h3>
            </div>
            <div className="myProfileRight">
              <p>{user && user.country ? user.country : "Add Country"}</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Verified</h3>
            </div>
            <div className="myProfileRight">
              <p>
                {user && user.isVerified ? (
                  "Verified"
                ) : (
                  <>
                    <button
                      className="sendVCode"
                      onClick={() => {
                        sendVCode();
                        Vibrate();
                      }}
                    >
                      {vLoading ? "Sending..." : "Verify Email"}
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="myProfileButtons flex gap05">
          <button
            className="myProfileLogout"
            onClick={() => {
              logout();
              Vibrate();
            }}
          >
            {loading ? "Logging Out..." : "Logout"}
          </button>
          {user.assessments?.length > 0 ? (
            <>
              <a
                href="/my-assessments"
                className="myProfileChangePassword mainBlueHoverBtn"
                onClick={Vibrate}
              >
                My Assessments
              </a>
            </>
          ) : null}

          <button
            className="myProfileUpdate mainBlueHoverBtn"
            onClick={Vibrate}
          >
            <a href="/update">Update Profile</a>
          </button>
          <a
            href="/change-password"
            className="myProfileChangePassword mainBlueHoverBtn"
          >
            Change Password
          </a>
          {user.isAdmin ? (
            <>
              <a
                className="myProfileChangePassword mainBlueHoverBtn"
                href="/users"
                onClick={Vibrate}
              >
                All Users
              </a>
            </>
          ) : null}
          {user.isAdmin ? (
            <>
              <a
                className="myProfileChangePassword mainBlueHoverBtn"
                href="/assessments-data"
                onClick={Vibrate}
              >
                All Assessments
              </a>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Profile;
