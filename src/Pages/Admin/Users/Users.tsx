import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../../Utils/Api";
import axios from "axios";
import { RiArrowDownLine } from "react-icons/ri";
import TableLoading from "../../../Components/Local/Loading/TableLoading/TableLoading";
import { CSVLink } from "react-csv";
import Vibrate from "../../../Utils/Vibrate";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 users per page

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

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calculate the users to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

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
            <button onClick={Vibrate}>
              <CSVLink
                headers={headers}
                data={users}
                filename={fileName}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {" "}
                {loading ? "Loading csv..." : "Download Excel"}
                <RiArrowDownLine style={{ marginBottom: "-0.16rem" }} />
              </CSVLink>
            </button>
          </div>
        </div>
        {currentUsers.length > 0 ? (
          <>
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
                {currentUsers.map((user, index) => {
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
          </>
        ) : (
          <TableLoading />
        )}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            Vibrate();
            setCurrentPage((prev) => prev - 1);
          }}
          className="pArrowBtn"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`pNumberBtn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => {
              Vibrate();
              setCurrentPage(i + 1);
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            Vibrate();
            setCurrentPage((prev) => prev + 1);
          }}
          className="pArrowBtn"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Users;
