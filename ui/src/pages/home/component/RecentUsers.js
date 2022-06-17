import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/index";

const RecentUsers = () => {
  const columns = [
    { field: "username", headerName: "Username", width: 250 },
    { field: "email_address", headerName: "Email Address", width: 250 },
  ];

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <DataTable
      rows={users}
      columns={columns}
    ></DataTable>
  );
};
export default RecentUsers;
