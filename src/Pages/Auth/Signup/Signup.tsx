import "./style.css";
const Signup = () => {
  return (
    <section className="signup width100 flex alignCenter justifyCenter flexColumn">
      <div className="signupContainer width95 maxWidth flex">
        <div className="signupLeft width50"></div>
        <div className="signupRight width50 flex flexColumn alignCenter justifyCenter">
          <div className="signupForm width70">
            <h2>Sign Up to Your Account</h2>
            <form>
              <h3>Full Name</h3>
              <input placeholder="ex. Harshit Kumar" type="text" />
              <h3>Email</h3>
              <input placeholder="ex. example@email.com" type="email" />
              <h3>Phone</h3>
              <input placeholder="ex. 9876543210" type="tel" />
              <h3>Occupation</h3>
              <div className="profileType flex marginBottom1 gap1">
                <div className="profile">
                  <h4>Student</h4>
                </div>
                <div className="profile">
                  <h4>Employee</h4>
                </div>
              </div>
              <h3>Password</h3>
              <input placeholder="********" type="password" />
              <button type="submit" style={{ display: "block" }}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
