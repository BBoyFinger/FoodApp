import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import "./SortByPrice.css";
import { useDispatch } from "react-redux";
import { ascendingProduct, descendingProduct } from "../../../actions/product/ProductAction";

function SortByPrice() {
  const dispatch = useDispatch();
  const [numberActive, setNumberActive] = useState(0);

  const ThapDenCao = () => {
    dispatch(descendingProduct());
    setNumberActive(1);
  };

  const CaoDenThap = () => {
    dispatch(ascendingProduct());
    setNumberActive(2);
  };

  return (
    <div className="sort-price">
      <h3 onClick={(e) => e.preventDefault()}>Sorted by</h3>
      <div className="sort-price-list">
        <div
          className={numberActive === 1 ? "sort-price-list-item active" : "sort-price-list-item"}
          onClick={ThapDenCao}
        >
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            width={18}
            height={18}
            viewBox={"0 0 24 24"}
            style={{ fill: "rgba(0, 0, 0, 1)", marginRight: 3 }}
          >
            <path d="M11 9h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5zm-6 3h2V8h3L6 4 2 8h3z"></path>
          </svg>
          <span>Price low - high</span>
        </div>
        <div
          className={numberActive === 2 ? "sort-price-list-item active" : "sort-price-list-item"}
          onClick={CaoDenThap}
        >
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            width={18}
            height={18}
            viewBox={"0 0 24 24"}
            style={{ fill: "rgba(0, 0, 0, 1)", marginRight: 3 }}
          >
            <path d="m6 20 4-4H7V4H5v12H2zm5-12h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5z"></path>
          </svg>
          <span>Price high - low</span>
        </div>
      </div>
    </div>
  );
}

export default SortByPrice;
