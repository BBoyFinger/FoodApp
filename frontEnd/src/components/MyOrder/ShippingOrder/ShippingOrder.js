import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderShippingByUser } from "../../../actions/OrderAction";
import { formatPrice } from "../../../unitls";
import Layout from "../../Layout/Layout";
import MyOrder from "../MyOrder";

const orderItem = (item) => (
  <div className="all-myorder-item">
    <div className="all-myorder-item-img">
      <img src={item.image}></img>
    </div>
    <div className="all-myorder-item-name">
      <p>{item.name}</p>
      <span>x{item.qty}</span>
    </div>
    <div className="all-myorder-item-price">{formatPrice(item.salePrice)}</div>
  </div>
);

export const orderParent = (item) => (
  <div className="all-myorder-parent-item">
    <div className="all-myorder-list">{item.orderItems.map((item) => orderItem(item))}</div>
    <div className="all-myorder-item-totalprice">
      <div>
        <span>Total : </span> <strong>{formatPrice(item.totalPrice)}</strong>
      </div>
    </div>
  </div>
);

function ShippingOrder() {
  const dispatch = useDispatch();
  const { myOrdersShipping } = useSelector((state) => state.orderByUser);

  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    dispatch(getOrderShippingByUser(userInfo?._id));
  }, [dispatch]);
  return (
    <Layout>
      <MyOrder>
        <div className="all-myorder">
          {myOrdersShipping && myOrdersShipping.length > 0 ? (
            myOrdersShipping.map((item) => orderParent(item))
          ) : (
            <div className="no-product">
              <img src="/images/logo.jpg" />
              <span>You have no orders</span>
            </div>
          )}
        </div>
      </MyOrder>
    </Layout>
  );
}

export default ShippingOrder;
