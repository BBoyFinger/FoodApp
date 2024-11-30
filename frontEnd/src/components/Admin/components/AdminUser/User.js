import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getAllUser } from "../../../../actions/UserAction";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

function User(props) {
  const { user, number } = props;
  const dispatch = useDispatch();
  const handleDeleteUser = async (user) => {
    await dispatch(deleteUser(user._id));
    dispatch(getAllUser());
  };
  return (
    <tr>
      <td>{number + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
      <td>
        <AiOutlineDelete onClick={() => handleDeleteUser(user)} />
        <Link style={{ marginLeft: 10, color: "#000" }} to={`/admin/user/update/${user._id}`}>
          <AiOutlineEdit />
        </Link>
      </td>
    </tr>
  );
}

export default User;









{/* <td>{user?.isAdmin === true?<p>Admin</p>:<p>User</p>}</td> */}