import "./style.css";
const Profile = () => {
  return (
    <section className="myProfile width100 flex alignCenter justifyCenter flexColumn">
      <div className="myProfileContainer maxWidth width95">
        <h1>Harshit Kumar</h1>
        <div className="myProfileInfo">
          <div className="myProfileTab flex alignStart justifyStart ">
            <div className="myProfileLeft">
              <h3>Email</h3>
            </div>
            <div className="myProfileRight">
              <p>harshitclub@gmail.com</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Phone</h3>
            </div>
            <div className="myProfileRight">
              <p>9410885485</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Assessments</h3>
            </div>
            <div className="myProfileRight">
              <p>0</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Profile Type</h3>
            </div>
            <div className="myProfileRight">
              <p>Employee</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Company</h3>
            </div>
            <div className="myProfileRight">
              <p>3a Learning Solutions</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Position</h3>
            </div>
            <div className="myProfileRight">
              <p>Web Developer</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Address</h3>
            </div>
            <div className="myProfileRight">
              <p>76/5, Mangal Puri</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>City</h3>
            </div>
            <div className="myProfileRight">
              <p>Meerut</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Zip</h3>
            </div>
            <div className="myProfileRight">
              <p>250001</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>State</h3>
            </div>
            <div className="myProfileRight">
              <p>Uttar Pradesh</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Country</h3>
            </div>
            <div className="myProfileRight">
              <p>India</p>
            </div>
          </div>
          <div className="myProfileTab flex alignStart justifyStart">
            <div className="myProfileLeft">
              <h3>Verified</h3>
            </div>
            <div className="myProfileRight">
              <p>No</p>
            </div>
          </div>
        </div>
        <div className="myProfileButtons flex gap05">
          <button className="myProfileLogout">Logout</button>
          <button className="myProfileUpdate">Update Profile</button>
          <a href="/" className="myProfileChangePassword">
            Change Password
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
