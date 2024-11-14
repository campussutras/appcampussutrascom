import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../../Utils/Api";
import axios from "axios";
import { RiArrowDownLine } from "react-icons/ri";
import TableLoading from "../../../Components/Local/Loading/TableLoading/TableLoading";
import { CSVLink } from "react-csv";

interface User {
  id: string;
  name: string;
  email: string; // Or string depending on format
  phone: string;
  profileType: string;
  isVerified?: boolean;
  createdAt?: string;
  assessments: Array<object>;
}

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api.users);
        console.log(response.data.data);

        setUsers(response.data.data);
        setLoading(false);
        // console.log(assess);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const fileName = "Campus-Sutras-Users";

  const headers = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Profile Type", key: "profileType" },
    { label: "Verified", key: "isVerified" },
    { label: "createdAt", key: "createdAt" },
  ];

  return (
    <section className="allUsers width100 flex alignCenter justifyCenter flexColumn">
      <div className="allUsersContainer width95 maxWidth">
        <div className="allUsersHead flex alignCenter spaceBtw">
          <h1>All Users</h1>
          <div className="allUsersBtns flex gap05">
            <button>Total {users?.length}</button>
            <button>
              <CSVLink
                headers={headers}
                data={users}
                filename={fileName}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {" "}
                {loading ? "Loading csv..." : "Download Excel File"}
                <RiArrowDownLine style={{ marginBottom: "-0.16rem" }} />
              </CSVLink>
            </button>
          </div>
        </div>
        {users.length > 0 ? (
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
        ) : (
          <TableLoading />
        )}
      </div>
    </section>
  );
};

export default Users;
