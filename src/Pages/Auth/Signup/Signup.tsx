import { useState } from "react";
import "./style.css";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileType: "",
    institute: "",
    company: "",
    position: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(signupData);
    setSignupData({
      name: "",
      email: "",
      phone: "",
      password: "",
      profileType: "",
      institute: "",
      company: "",
      position: "",
    });
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  return (
    <section className="signup width100 flex alignCenter justifyCenter flexColumn">
      <div className="signupContainer width95 maxWidth flex">
        <div className="signupRight width100 flex flexColumn alignCenter justifyCenter">
          <div className="signupForm width40">
            <div className="signupFormHead">
              <h2>Sign Up to Campus Sutras</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <h3>Full Name</h3>
              <input
                placeholder="ex. Harshit Kumar"
                type="text"
                name="name"
                onChange={handleChange}
                value={signupData.name}
              />
              <h3>Email</h3>
              <input
                placeholder="ex. example@email.com"
                type="email"
                name="email"
                onChange={handleChange}
                value={signupData.email}
              />
              <h3>Phone</h3>
              <input
                placeholder="ex. 9876543210"
                type="tel"
                name="phone"
                onChange={handleChange}
                value={signupData.phone}
              />
              <h3>Occupation</h3>
              <div className="profileType flex marginBottom1 gap1">
                <div
                  className={`profile ${
                    signupData.profileType === "Student"
                      ? "profileSelected"
                      : null
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, profileType: "Student" })
                  }
                >
                  <h4>Student</h4>
                </div>
                <div
                  className={`profile ${
                    signupData.profileType === "Employee"
                      ? "profileSelected"
                      : null
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, profileType: "Employee" })
                  }
                >
                  <h4>Employee</h4>
                </div>
              </div>
              {signupData.profileType === "Employee" && (
                <>
                  <h3>Company</h3>
                  <input
                    placeholder="ex. Campus Sutras Private Limited"
                    type="text"
                    name="company"
                    onChange={handleChange}
                    value={signupData.company}
                  />
                  <h3>Position</h3>
                  <input
                    placeholder="ex. Sales Manager"
                    type="text"
                    name="position"
                    onChange={handleChange}
                    value={signupData.position}
                  />
                </>
              )}
              {signupData.profileType === "Student" && (
                <>
                  <h3>Institute</h3>
                  <input
                    placeholder="Institute Name"
                    type="text"
                    name="institute"
                    onChange={handleChange}
                    value={signupData.institute}
                  />
                </>
              )}
              <h3>Password</h3>
              <input
                placeholder="********"
                type="password"
                name="password"
                onChange={handleChange}
                value={signupData.password}
              />
              <h3>Confirm Password</h3>
              <input placeholder="********" type="password" name="cPassword" />
              <button type="submit" style={{ display: "block" }}>
                {loading ? "Sign Up..." : "Sign Up"}
              </button>
            </form>
            <p className="marginBottom1">
              Already have account - <a href="">Login</a>
            </p>
            <p>
              Forget Password - <a href="">Forget Password</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
