import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/user/get-user/${id}`
        );

        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);
  return (
    <section className="adminUser width100 flex alignCenter justifyCenter flexColumn">
      <div className="adminUserHeader width95 maxWidth ">
        <h1>User</h1>
      </div>
      <div className="adminUserContainer width95 maxWidth">{user.name}</div>
      <a href={`/user-assessments/${user.id}`}>User Assessments</a>
    </section>
  );
};

export default User;
