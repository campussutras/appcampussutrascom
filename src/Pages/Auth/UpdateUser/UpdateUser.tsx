import "./style.css";
import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    console.log(updateUserData);
    setUpdateUserData({
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

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateUserData({ ...updateUserData, [name]: value });
  };
  return (
    <>
      <main className="updateUser width100 flex alignCenter justifyCenter flexColumn">
        {/* {contextHolder} */}
        <div className="uPContainer width95 maxWidth flex alignCenter justifyCenter flexColumn">
          <div className="uPForm width40">
            <div className="uPFormHead">
              <h1>Update Profile</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <h3>Name</h3>
              <input
                placeholder="Enter your name"
                type="text"
                name="name"
                onChange={handleChange}
                value={updateUserData.name}
              />
              <h3>Phone</h3>
              <input
                placeholder="Enter phone"
                type="tel"
                name="phone"
                onChange={handleChange}
                value={updateUserData.phone}
              />
              <h3>Occupation</h3>
              <div className="profileType flex marginBottom1 gap1">
                <div
                  className={`profile width50 flex alignCenter justifyCenter ${
                    updateUserData.profileType === "Student"
                      ? "profileSelected"
                      : null
                  }`}
                  onClick={() =>
                    setUpdateUserData({
                      ...updateUserData,
                      profileType: "Student",
                    })
                  }
                >
                  <h4>Student</h4>
                </div>
                <div
                  className={`profile width50 flex alignCenter justifyCenter ${
                    updateUserData.profileType === "Employee"
                      ? "profileSelected"
                      : null
                  }`}
                  onClick={() =>
                    setUpdateUserData({
                      ...updateUserData,
                      profileType: "Employee",
                    })
                  }
                >
                  <h4>Employee</h4>
                </div>
              </div>
              {updateUserData.profileType === "Employee" && (
                <>
                  <h3>Company</h3>
                  <input
                    placeholder="ex. Campus Sutras Private Limited"
                    type="text"
                    name="company"
                    onChange={handleChange}
                    value={updateUserData.company}
                  />
                  <h3>Position</h3>
                  <input
                    placeholder="ex. Sales Manager"
                    type="text"
                    name="position"
                    onChange={handleChange}
                    value={updateUserData.position}
                  />
                </>
              )}
              {updateUserData.profileType === "Student" && (
                <>
                  <h3>Institute</h3>
                  <input
                    placeholder="Institute Name"
                    type="text"
                    name="institute"
                    onChange={handleChange}
                    value={updateUserData.institute}
                  />
                </>
              )}
              <h3>Country</h3>
              <input
                placeholder="Enter your country"
                type="text"
                name="country"
                onChange={handleChange}
                value={updateUserData.country}
              />

              <h3>State</h3>
              <input
                placeholder="Enter your state"
                type="text"
                name="state"
                onChange={handleChange}
                value={updateUserData.state}
              />
              <h3>City</h3>
              <input
                placeholder="Enter your city"
                type="text"
                name="city"
                onChange={handleChange}
                value={updateUserData.city}
              />
              <h3>Zip</h3>
              <input
                type="number"
                placeholder="Enter postal code"
                name="zip"
                onChange={handleChange}
                value={updateUserData.zip}
              />
              <h3>Local Address</h3>
              <textarea
                placeholder="Enter your local address"
                name="localAddress"
                onChange={handleChange}
                value={updateUserData.localAddress}
              />
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
