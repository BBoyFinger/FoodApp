import React from "react";
import User from "./User";

function ListUser({ users }) {
  return (
    <div className="admin-user-list">
      <table>
        <tbody>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th style={{ width: 100 }}>Action</th>
          </tr>
          {users.map((item, index) => (
            <User user={item} number={index} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;
