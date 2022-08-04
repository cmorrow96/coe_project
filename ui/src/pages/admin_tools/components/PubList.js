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
import { PublisherService } from "../../../services";

const PubList = () => {
  const navigate = useNavigate();

  const [pubs, setPubs] = useState([]);
  const getPublishers = async () => {
    PublisherService.getPublishers().then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const pubArray = data.data;
        setPubs(pubArray);
      } else {
        alert("Error, check publishers");
        navigate(NavigationRoutes.AdminTools);
      }
    });
  };

  useEffect(() => {
    getPublishers();
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

  return <DataTable rows={pubs} columns={columns}></DataTable>;
};
export default PubList;
