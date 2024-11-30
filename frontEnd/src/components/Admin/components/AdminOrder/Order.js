import React from "react";
import { useDispatch } from "react-redux";
import { createOrderGhn, PrintOrderGhn } from "../../../../actions/GhnAction";
import { deleteOrder, getAllOrder, ShippingOrder } from "../../../../actions/OrderAction";
import { formatDateOrderPaypal, formatPrice } from "../../../../unitls";

function Order({ order }) {
  const dispatch = useDispatch();

  const { orderItems, totalPrice, paymentMethod, cancelOrder, shippingAddress, status, paymentResult } = order;

  const handleShippingOrder = async (order) => {
    await dispatch(createOrderGhn(order._id)); // create order in giaohangnhanh
    await dispatch(ShippingOrder(order._id));

    dispatch(getAllOrder());
  };

  const handlePrintOrder = (order) => {
    console.log(order._id);
    dispatch(PrintOrderGhn(order._id));
  };

  const handleDeleteOrder = async (order) => {
    await dispatch(deleteOrder(order._id));
    dispatch(getAllOrder());
  };
  return (
    <>
      <div className="order-list">
        <div className="order-list-items">
          {orderItems.map((item, i) => (
            <div key={i} className="order-items-item">
              <span className="img">
                <img src={item.image}></img>
              </span>
              <span className="qty">Qty: {item.qty}</span>
              <span className="name">{item.name}</span>
              <span className="price">{formatPrice(item.salePrice)}</span>
            </div>
          ))}
        </div>
        <div className="toatalPrice">
          <span>Total: {formatPrice(totalPrice)}</span>
        </div>
        <div className="order-info">
          <div className="order-info-address">
            <b>Address : </b> {"  "}
            {shippingAddress.name},{""}
            {shippingAddress.province}, {shippingAddress.district},{"  "}
            {shippingAddress.ward}, {shippingAddress.detail}, {shippingAddress.phone}
          </div>
        </div>

        {paymentResult ? (
          <div className="order-payment-check">Paid : {formatDateOrderPaypal(paymentResult.update_time)}</div>
        ) : (
          ""
        )}

        <div className="order-bottom">
          {status === "shipping" ? (
            <div className="order-status">
              <span>Confirmed {paymentMethod === "payOnline" ? <span>& Paid</span> : ""}</span>
            </div>
          ) : (
            ""
          )}

          <div className="order-button">
            {status === "pendding" && cancelOrder === false ? (
              <>
                <button className="shipping" onClick={() => handleShippingOrder(order)}>
                  Confirm Order
                </button>
              </>
            ) : (
              ""
            )}

            {cancelOrder === true ? (
              <>
                <span> Customer requests to cancel order</span>
                <button className="shipping" onClick={() => handleDeleteOrder(order)}>
                  Cancel order
                </button>
              </>
            ) : (
              ""
            )}

            {status === "shipping" ? (
              <button className="shipping" onClick={() => handlePrintOrder(order)}>
                Print order
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
