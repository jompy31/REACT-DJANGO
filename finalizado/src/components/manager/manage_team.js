import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../dashboard/Header";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(baseUrl + "/auth/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleRowSelection = (selection) => {
    setSelectedRows(selection);
  };

  const handleEditSelected = () => {
    console.log("Elementos seleccionados:", selectedRows);
  };

  const handleDeleteSelected = () => {
    console.log("Elementos seleccionados para eliminar:", selectedRows);
    toast.success("Elements deleted successfully!");
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setShowDeleteConfirmation(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px" height="100vh"
    width="100%">
      <br />
      <br />
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Link
        to="/newteammember"
        style={{
          textDecoration: "none",
          marginRight: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
          }}
          disabled={selectedRows.length === 0}
        >
          New
        </Button>
      </Link>
      <Link
        to="/editteammember"
        style={{ textDecoration: "none", marginRight: "10px" }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[200],
            color: colors.grey[100],
            fontWeight: "bold",
          }}
          disabled={selectedRows.length === 0}
        >
          Edit
        </Button>
      </Link>
      <Link
        to="/deleteteammember"
        style={{ textDecoration: "none", marginRight: "10px" }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[200],
            color: colors.grey[100],
            fontWeight: "bold",
          }}
          disabled={selectedRows.length === 0}
        >
          Delete
        </Button>
      </Link>
      <Box position="relative">
        <ToastContainer />
        {showDeleteConfirmation && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            backgroundColor={colors.grey[100]}
            padding="20px"
            borderRadius="4px"
            boxShadow={`0 0 10px ${colors.grey[300]}`}
          >
            <Typography variant="h6" gutterBottom>
              Are you sure you want to delete?
            </Typography>
            <Box display="flex" justifyContent="center" marginTop="20px">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteSelected}
                sx={{ marginRight: "10px" }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteConfirmationClose}
              >
                No
              </Button>
            </Box>
          </Box>
        )}
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          
          <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          onSelectionModelChange={handleRowSelection}
            components={{
              Toolbar: () => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  mb={2}
                >

                </Box>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
