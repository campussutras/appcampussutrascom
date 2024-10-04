import "./style.css";
import { useState } from "react";
// import { message } from "antd";
const UpdateUser = () => {
  //   const [messageApi, contextHolder] = message.useMessage();
  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    phone: "",
    profileType: "",
    institute: "",
    company: "",
    position: "",
    localAddress: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  return (
    <>
      <main className="updateUser width100 flex alignCenter justifyCenter flexColumn">
        {/* {contextHolder} */}
        <div className="uPContainer width95 maxWidth flex alignCenter justifyCenter flexColumn">
          <div className="uPForm width40">
            <div className="uPFormHead">
              <h1>Update Profile</h1>
            </div>
            <form>
              <h3>Name</h3>
              <input
                placeholder="Enter your name"
                type="text"
                name=""
                required
              />
              <h3>Phone</h3>
              <input placeholder="Enter phone" type="tel" name="" required />
              <h3>Local Address</h3>
              <textarea />
              <h3>City</h3>
              <input placeholder="Enter your city" type="text" />
              <h3>Zip</h3>
              <input type="number" placeholder="Enter postal code" />
              <h3>State</h3>
              <input placeholder="Enter your state" type="text" />
              <h3>Country</h3>
              <input placeholder="Enter your country" type="text" />
              <button type="submit">
                {loading ? "Updating..." : "Update User"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateUser;
