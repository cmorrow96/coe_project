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
import { DeveloperService } from "../../../services";

const DevList = () => {
  const navigate = useNavigate();

  const [devs, setDevs] = useState([]);
  const getDevelopers = async () => {
    DeveloperService.getDevelopers().then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const devArray = data.data;
        setDevs(devArray);
      } else {
        alert("Error, check developers");
        navigate(NavigationRoutes.AdminTools);
      }
    });
  };

  useEffect(() => {
    getDevelopers();
  });

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
    { field: "name", headerName: "Name", width: 250 },
    { field: "edit", headerName: "", width: 80, renderCell: editButton },
    { field: "delete", headerName: "", width: 80, renderCell: deleteButton },
  ];

  return <DataTable rows={devs} columns={columns}></DataTable>;
};
export default DevList;
