import React from "react";
import "./orderadmin.css";
import AdminOrderAll from "./AdminOrderAll";
import AdminOrderMenu from "./AdminOrderMenu";

function AdminOrder() {
  return (
    <div style={{ height: "100vh", overflow: "scroll" }}>
      <AdminOrderMenu />
      <AdminOrderAll />
    </div>
  );
}

export default AdminOrder;


//ok