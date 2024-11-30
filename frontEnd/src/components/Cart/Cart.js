import React from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { formatPrice } from "../../unitls";
import ListProductCart from "./ListProductCart";

function Cart(props) {
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  var userInfo = useSelector((state) => state.userSignin.userInfo);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.salePrice, 0);

  const Order = () => {
    if (userInfo) {
      window.location.href = "http://localhost:3000/order";
    } else {
      alert("You need to log in");
      //   history.push("/login");
    }
  };
  return (
    <section style={{marginBottom: "50px"}} id="shopping-cart">
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          {/* <Link to="/" className="back">
            Go to store
          </Link> */}
          <h2 className="shopping-cart-title">My shopping cart</h2>
        </div>

        {cartItems ? <ListProductCart products={cartItems} /> : ""}

        {totalPrice <= 0 ? (
          <div className="no-product">
            <img src="/images/logo.jpg" />
            <div style={{ textAlign: "center", marginBottom: 4 }}>Your shopping cart is empty.</div>
            <div style={{ textAlign: "center" }}>Please select more products to shop.</div>
          </div>
        ) : (
          <div className="total-cart-footer">
            <div className="total-price">
              <span className="left">Total amount</span>
              <span className="right">{formatPrice(totalPrice)}</span>
            </div>
            <div className="order">
              <Link onClick={() => Order()}>Order now</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
