import "./style.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { RiArrowDownLine } from "react-icons/ri";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/user/get-users"
        );
        // console.log(response.data.data);

        setUsers(response.data.data);
        // console.log(assess);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <section className="allUsers width100 flex alignCenter justifyCenter flexColumn">
      <div className="allUsersContainer width95 maxWidth">
        <div className="allUsersHead flex alignCenter spaceBtw">
          <h1>All Users</h1>
          <div className="allUsersBtns flex gap05">
            <button>Total {users?.length}</button>
            <button>
              Excel <RiArrowDownLine style={{ marginBottom: "-0.16rem" }} />
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Profile</th>
              <th>Assessments</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.profileType}</td>
                  <td>{user.assessments?.length}</td>
                  <td>
                    <a href={`/user/${user.id}`}>Profile</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
