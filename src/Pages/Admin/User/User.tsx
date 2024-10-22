import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { api } from "../../../Utils/Api";
const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${api.user}/${id}`);

        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);
  return (
    <section className="adminUser width100 flex alignCenter justifyCenter flexColumn">
      {/* <div className="adminUserHeader width95 maxWidth ">
        <h1>User</h1>
      </div>
      <div className="adminUserContainer width95 maxWidth">{user.name}</div>
      <a href={`/user-assessments/${user.id}`}>User Assessments</a> */}
      <div className="adminUContainer width95 maxWidth">
        <div className="aUserBread">
          <a href="/">
            Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
          </a>
        </div>
        <h1>{user.name ? user.name : "Loading..."}</h1>
        <div className="adminUInfo">
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Email</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.email ? user.email : "Loading..."}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Phone</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.phone ? user.phone : "Loading..."}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Assessments</h3>
            </div>
            <div className="userInfoRight">
              <p>
                {user.assessments?.length
                  ? user.assessments.length
                  : "No Assessment"}
              </p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Profile</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.profileType ? user.profileType : "Loading..."}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Address</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.localAddress ? user.localAddress : `Not Updated Yet`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>City</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.city ? user.city : `Not Updated Yet`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Zip</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.zip ? user.zip : `Not Updated Yet`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>State</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.state ? user.state : `Not Updated Yet`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Country</h3>
            </div>
            <div className="userInfoRight">
              <p>{user.country ? user.country : `Not Updated Yet`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Verified</h3>
            </div>
            <div className="userInfoRight">
              <p>{!user.isVerified ? `Not Verified` : `Verified`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Admin</h3>
            </div>
            <div className="userInfoRight">
              <p>{!user.isAdmin ? `Not Admin` : `Admin`}</p>
            </div>
          </div>
          <div className="userInfoTab flex alignStart justifyStart">
            <div className="userInfoLeft">
              <h3>Since</h3>
            </div>
            <div className="userInfoRight">
              <p>
                {user.createdAt ? user.createdAt.split("T")[0] : "Loading..."}
              </p>
            </div>
          </div>
        </div>
        {user.assessments?.length > 0 ? (
          <>
            <div className="adminUAssessInfo">
              <a href={`/user-assessments/${user.id}`}>User's Assessments</a>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default User;
