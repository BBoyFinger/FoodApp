import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProductByPrice, getAllProduct } from "../../../actions/product/ProductAction";
import FilterMenu from "../FilterMenu/FilterMenu";
import Slider from "@mui/material/Slider";
import "../FilterProduct/index.css";

function FilterProduct() {
  const dispatch = useDispatch();
  const [values, setValues] = useState([0, 1000000]);

  // Function to filter products by price range
  const filterProductsByPrice = () => {
    const [startPrice, endPrice] = values;

    // No filtering, get all products
    if (startPrice === 0 && endPrice === 1000000) {
      dispatch(getAllProduct());
    } else {
      // Filter products by price range
      dispatch(filterProductByPrice(startPrice, endPrice));
    }
  };

  // Function to format currency using Intl.NumberFormat
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(amount);
  };

  return (
    <div className="filter">
      <FilterMenu />
      <div className="options-price">
        <h3>Filter prices</h3>
        <div className="list-max-min">
          <div>{formatCurrency(values[0])}</div>
          <div>{formatCurrency(values[1])}</div>
        </div>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={values}
          onChange={(_, value) => {
            setValues(value);
          }}
          min={0}
          max={1000000}
          sx={{
            width: "100%",
            margin: "0 auto",
            color: "#265073",
          }}
        />
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 10 }}>
          {/* Button to trigger product filtering */}
          <button onClick={filterProductsByPrice} className="btn-search">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterProduct;
