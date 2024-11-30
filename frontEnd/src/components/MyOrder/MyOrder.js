import React from "react";
import "./myorder.css"
import MenuOrder from "./MenuOrder";

function MyOrder({ children }) {
  return (
    <section id="myorder">
      <div className="myorder">
        <MenuOrder />
        <div className="myorder-content">{children}</div>
      </div>
    </section>
  );
}

export default MyOrder;
