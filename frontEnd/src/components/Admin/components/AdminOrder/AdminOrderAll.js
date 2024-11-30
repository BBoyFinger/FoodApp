import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../../actions/OrderAction";
import ListOrder from "./ListOrder";
import CircularProgress from "@mui/material/CircularProgress";
function AdminOrderAll() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrder.order);
  //   const { orderGhnInfo } = useSelector((state) => state.orderGhn);
  //   const orderGhn = useSelector((state) => state.orderGhn);

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {orders && orders.length > 0 ? (
        <ListOrder orders={orders}></ListOrder>
      ) : (
        <CircularProgress style={{ margin: "auto" }} />
      )}
    </div>
  );
}

export default AdminOrderAll;
