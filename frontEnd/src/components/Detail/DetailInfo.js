import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddToCart } from "../../actions/CartAction";
import { formatPrice } from "../../unitls";

function DetailInfo({ product }) {
  const dispatch = useDispatch();

  function handleAddProduct(product) {
    const action = AddToCart(product);
    dispatch(action);
  }
  return (
    <div className="detail-info-right">
      <div className="detail-info-right-price">
        <p className="price-box">
          <span className="saleprice">{formatPrice(product.salePrice)}</span>
          <span className="old-price">
            Listed price : <strong className="price">{formatPrice(product.price)}</strong>{" "}
          </span>
        </p>
        <p className="detail-info-sale">The product is part of the WEEKEND HOT SALE program - Quick payment!</p>
      </div>

      <div className="detail-info-right-buy">
        <div className="detail-info-right-buy-now">
          <Link to="/cart" onClick={() => handleAddProduct(product)}>
            <strong>Buy now</strong>
            <br></br>
            <span>(Home delivery or in-store pickup)</span>
          </Link>
        </div>
        <div className="detail-info-right-buy-installment">
          <a href="">
            <strong>0% Interest Rate</strong>
            <br></br>
            <span>(Review by T-MART)</span>
          </a>
          <a href="">
            <strong>Payment VIA CARD</strong>
            <br></br>
            <span>(Visa, Master, JCB)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetailInfo;
