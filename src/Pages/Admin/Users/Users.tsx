import "./style.css";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
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
  const columns = useMemo(
    () => [
      {
        accessorKey: "Index", //access nested data with dot notation
        header: "Index",
        size: 150,
      },
      {
        accessorKey: "Name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "Email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "Phone", //normal accessorKey
        header: "Phone",
        size: 200,
      },
      {
        accessorKey: "Profile",
        header: "Profile",
        size: 150,
      },
      {
        accessorKey: "Verified",
        header: "Verified",
        size: 150,
      },
      {
        accessorKey: "Date",
        header: "Date",
        size: 150,
      },
      {
        accessorKey: "Time",
        header: "Time",
        size: 150,
      },
      {
        accessorKey: "View",
        header: "View",
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: users.map((user, index) => ({
      Index: index,
      Name: user?.name,
      Email: user?.email,
      Phone: user?.phone,
      Profile: user?.profileType,
      Verified: !user.isVerified ? "Not Verified" : "Verified",
      Date: user?.createdAt,
      Time: user?.createdAt,
      Assessments: user?.assessments.name,
      View: <a href={`/user/${user.id}`}>Profile</a>,
    })),
  });
  return (
    <section className="allUsers width100 flex alignCenter justifyCenter flexColumn">
      <div className="allUsersHeader width95 maxWidth">header</div>
      <div className="allUsersContainer width95 maxWidth">
        <MaterialReactTable table={table} />
      </div>
    </section>
  );
};

export default Users;
