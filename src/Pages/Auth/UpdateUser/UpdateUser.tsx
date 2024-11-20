import axios from "axios";
import "./style.css";
import React, { useState } from "react";
import { api } from "../../../Utils/Api";
import { message } from "antd";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../../store/atoms/userAtom";

const UpdateUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const setUser = useSetRecoilState(userAtom);
  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    phone: "",
    profileType: "",
    institute: "",
    course: "",
    company: "",
    position: "",
    localAddress: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const constructUpdateData = (updateUserData: any) => {
    const updatedFields: any = {};

    for (const field in updateUserData) {
      if (updateUserData[field] !== "") {
        updatedFields[field] = updateUserData[field];
      }
    }

    return updatedFields;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const updatedData = constructUpdateData(updateUserData);
      const response = await axios.patch(api.update, updatedData, {
        withCredentials: true,
      });
      const success = () => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      };
      success();
      setUser(response.data.data);
      console.log(updateUserData);

      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        // Access and display specific error message from server response
        const errorMessage =
          error.response.data.error || "Error updating user.";
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
    setUpdateUserData({
      name: "",
      phone: "",
      profileType: "",
      institute: "",
      course: "",
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
        {contextHolder}
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
                  <h3>Course</h3>
                  <input
                    placeholder="Institute Name"
                    type="text"
                    name="course"
                    onChange={handleChange}
                    value={updateUserData.course}
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
                {loading ? <span className="btnLoader"></span> : "Update"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateUser;
