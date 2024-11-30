import React, { Children, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./slide.css";
import {
  AiOutlineAppstore,
  AiOutlineUsergroupAdd,
  AiOutlineShop,
  AiOutlineUnorderedList,
  AiOutlineWechat,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function Slide({ children }) {
  //   const dispatch = useDispatch();
  const location = useLocation();
  //   const { orderPendding } = useSelector((state) => state.allOrder);
  //   let totalNewOrder;

  //   if (orderPendding) {
  //     totalNewOrder = orderPendding.length;
  //   }

  //   useEffect(() => {
  //     const getNewOrder = () => {
  //       dispatch(GetAllOrderPendding());
  //     };
  //     getNewOrder();
  //   }, [dispatch]);
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar-top">
          <Link to={"/"}>
            <img src="https://logos.textgiraffe.com/logos/logo-name/Admin-designstyle-pastel-m.png" />
          </Link>
        </div>
        <div className="sidebar-list">
          <Link
            to="/admin"
            className={location.pathname.endsWith("/admin") ? "sidebar-list-item active" : "sidebar-list-item"}
          >
            <span>
              <AiOutlineAppstore />
            </span>
            <p>Dashboard</p>
          </Link>
          <Link
            to="/admin/user"
            className={location.pathname === "/admin/user" ? "sidebar-list-item active" : "sidebar-list-item"}
          >
            <span>
              <AiOutlineUsergroupAdd />
            </span>
            <p>User Management</p>
          </Link>
          <Link
            to="/admin/product"
            className={location.pathname === "/admin/product" ? "sidebar-list-item active" : "sidebar-list-item"}
          >
            <span>
              <AiOutlineShop />
            </span>
            <p>Product Management</p>
          </Link>
          <Link
            to="/admin/inventory"
            className={location.pathname === "/admin/inventory" ? "sidebar-list-item active" : "sidebar-list-item"}
          >
            <span>
              <AiOutlineUnorderedList />
            </span>
            <p>Inventory Manage</p>
          </Link>
          <Link
            to="/admin/order"
            className={location.pathname === "/admin/order" ? "sidebar-list-item active" : "sidebar-list-item"}
          >
            <span>
              <AiOutlineUnorderedList />
            </span>
            <p>
              Order management
            </p>
          </Link>
          <Link
            to="/admin/chat"
            className={location.pathname === "/admin/chat" ? "sidebar-list-item active" : "sidebar-list-item"}
          >
            <span>
              <AiOutlineWechat />
            </span>
            <p>Chat</p>
          </Link>
        </div>
      </div>
      <div className="layout__content">
        <div className="layout__content-main">{children}</div>
      </div>
    </div>
  );
}

export default Slide;
