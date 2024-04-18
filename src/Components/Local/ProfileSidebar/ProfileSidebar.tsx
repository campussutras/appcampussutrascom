import "./style.css";

const ProfileSidebar = () => {
  const pathname = window.location.pathname;
  console.log(pathname);

  return (
    <aside className="profileSideBar width15 flex alignCenter justifyStart  flexColumn">
      {/* <div className="profileHeader width100">
        <h3>Welcome</h3>
        <h2>Harshit</h2>
      </div> */}
      <div className="profileMenu width100 flex alignStart spaceBtw flexColumn">
        <ul>
          <li
            className={`${pathname === "/profile" ? "sidebarLinkActive" : ""}`}
          >
            <a href="/">Profile</a>
          </li>
          <li>
            <a href="/">Assessments</a>
          </li>
          <li>
            <a href="/">Change Password</a>
          </li>
          <li>
            <a href="/">Settings</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
        <button>Logout</button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
