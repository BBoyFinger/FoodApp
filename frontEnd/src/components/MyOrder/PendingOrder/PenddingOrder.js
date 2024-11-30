import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrderPenddingByUser } from "../../../actions/OrderAction";
import { formatPrice } from "../../../unitls";
import Layout from "../../Layout/Layout";
import MyOrder from "../MyOrder";

function PenddingOrder() {
  const dispatch = useDispatch();
  const { myOrdersPendding } = useSelector((state) => state.orderByUser);
  const { userInfo } = useSelector((state) => state.userSignin);

  const orderParent = (item) => (
    <div className="all-myorder-parent-item">
      <div className="all-myorder-list">{item.orderItems.map((item) => orderItem(item))}</div>
      <div className="all-myorder-item-totalprice">
        {item.paymentMethod === "payOnline" ? <span>Đã thanh toán : </span> : <span>Total : </span>}{" "}
        <strong>{formatPrice(item.totalPrice)}</strong>
        <div className="myorder-cancel">
          {item.cancelOrder ? (
            <span>Đang yêu cầu hủy đơn</span>
          ) : (
            <span onClick={() => handleCancelOrder(item)}>Hủy đơn hàng</span>
          )}
        </div>
      </div>
    </div>
  );
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

  const handleCancelOrder = async (item) => {
    await dispatch(cancelOrder(item._id));
    dispatch(getOrderPenddingByUser(userInfo._id));
  };

  useEffect(() => {
    dispatch(getOrderPenddingByUser(userInfo?._id));
  }, [dispatch]);
  return (
    <Layout>
      <MyOrder>
        <div className="all-myorder">
          {myOrdersPendding && myOrdersPendding.length > 0 ? (
            myOrdersPendding.map((item) => orderParent(item))
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

export default PenddingOrder;
