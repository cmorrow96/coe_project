import React, { useState, useEffect } from "react";
import { DataTable } from "../../../components";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";
import { UserService } from "../../../services";

const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    UserService.getUsers().then(async (data) => {
      const status = data.status;
      if (status == 200) {
        const userArray = data.data;
        setUsers(userArray);
      } else {
        alert("Error, check users");
        navigate(NavigationRoutes.AdminTools);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const editButton = () => {
    return (
      <Button variant="outlined" color="secondary" size="small">
        Edit
      </Button>
    );
  };

  const deleteButton = () => {
    return (
      <Button variant="outlined" color="error" size="small">
        Delete
      </Button>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "username", headerName: "Username", width: 250 },
    {
      field: "user_type",
      headerName: "User Type",
      valueFormatter: (params) => params.value.description,
      width: 250,
    },
    { field: "email_address", headerName: "Email Address", width: 250 },
    { field: "forename", headerName: "Forename", width: 250 },
    { field: "surname", headerName: "Surname", width: 250 },
    { field: "edit", headerName: "", width: 80, renderCell: editButton },
    { field: "delete", headerName: "", width: 80, renderCell: deleteButton },
  ];

  return <DataTable rows={users} columns={columns}></DataTable>;
};
export default UserList;
