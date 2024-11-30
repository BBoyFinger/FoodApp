import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../../actions/UserAction";
import ListUser from "./ListUser";
import "./adminuser.css";
import CircularProgress from "@mui/material/CircularProgress";

function AdminUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.user);
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <div className="admin-user">
      <span>User Management</span>
      {users ? (
        <ListUser users={users} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default AdminUser;
