import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getOrderPenddingByUser, getOrderShippingByUser } from "../../actions/OrderAction";

function MenuOrder() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userSignin);
  const { myOrdersPendding } = useSelector((state) => state.orderByUser);
  const { myOrdersShipping } = useSelector((state) => state.orderByUser);

  useEffect(() => {
    if (!userInfo?._id) return;
    const getAllOrderPenddingAndShippingByUser = async () => {
      await dispatch(getOrderPenddingByUser(userInfo?._id));
      dispatch(getOrderShippingByUser(userInfo?._id));
    };

    getAllOrderPenddingAndShippingByUser();
  }, [dispatch]);
  return (
    <div className="myorder-menu">
      <div className={location?.pathname === "/myOrder" ? "myorder-menu-item active" : "myorder-menu-item"}>
        <Link to={"/myOrder"} className="btn-order">
          All
        </Link>
      </div>
      <div className={location?.pathname === "/myOrder/pendding" ? "myorder-menu-item active" : "myorder-menu-item"}>
        <Link to="/myOrder/pendding" className="btn-order">
          Processing
        </Link>
        {myOrdersPendding?.length > 0 ? (
          <div className="myorder-menu-item-newPendding">{myOrdersPendding.length}</div>
        ) : (
          ""
        )}
      </div>
      <div className={location?.pathname === "/myOrder/shipping" ? "myorder-menu-item active" : "myorder-menu-item"}>
        <Link to="/myOrder/shipping" className="btn-order">
          Delivering
        </Link>
        {myOrdersShipping?.length > 0 ? (
          <div className="myorder-menu-item-newShipping">{myOrdersShipping.length}</div>
        ) : (
          ""
        )}
      </div>
      <div className={location?.pathname === "/myOrder/paid" ? "myorder-menu-item active" : "myorder-menu-item"}>
        <Link to="/myOrder/paid" className="btn-order">
          Delivered
        </Link>
      </div>
    </div>
  );
}

export default MenuOrder;
