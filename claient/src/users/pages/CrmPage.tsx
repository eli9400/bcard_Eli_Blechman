import React, { useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hook/useUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { userMapToModelType } from "../models/types/userTypes";
import CardDeleteDialog from "../../cards/components/CardDeleteDialog";

const CrmPage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialog] = useState(false);
  const { user } = useUser();
  const { handleGetUsers, handleChangeStatusBiz, handleDeleteUser } =
    useUsers();
  const [users, setUsers] = useState<userMapToModelType[]>([]);
  const handelDialog = (term?: string | null) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate(ROUTES.ROOT);
    }
    const fetchUsers = async () => {
      const usersData = await handleGetUsers();
      if (usersData !== undefined) {
        setUsers(usersData);
      }
    };
    fetchUsers();
  }, [navigate, user, handleGetUsers]);
  const handleButtonChangeStatus = async (userID: string) => {
    try {
      await handleChangeStatusBiz(userID);
      const usersData = await handleGetUsers();
      if (usersData !== undefined) {
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Error occurred while changing user status", error);
    }
  };
  const handleButtonDeleteUser = async (userID: string) => {
    try {
      handelDialog();
      await handleDeleteUser(userID);
      const usersData = await handleGetUsers();
      if (usersData !== undefined) {
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Error occurred while changing user status", error);
    }
  };

  if (users.length > 0) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>isBusiness</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>ActionDelete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{`${item.first} ${
                  item.middle ? item.middle + " " : ""
                }${item.last}`}</TableCell>
                <TableCell>{item.isBusiness ? "Yes" : "No"}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Button
                    disabled={item.isAdmin}
                    variant="contained"
                    onClick={() => {
                      handleButtonChangeStatus(item._id);
                    }}
                  >
                    Chang status
                  </Button>
                  <CardDeleteDialog
                    isDialogOpen={isDialogOpen}
                    onChangeDialog={handelDialog}
                    onDelete={() => handleButtonDeleteUser(item._id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    disabled={item.isAdmin}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handelDialog("open");
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
};

export default CrmPage;
