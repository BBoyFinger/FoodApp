import React from "react";
import { useSelector } from "react-redux";
import { handlePercentDiscount } from "../../unitls";
import "./Search.css";
import ListPoducts from "../Products/ListPoducts";
function Search(props) {
  const searchProduct = useSelector((state) => state.searchProduct);
  const { products } = searchProduct;

  return (
    <section id="hotsale iphone">
      <div className="hotsale">
        {products && products.length > 0 ? (
          <ListPoducts HotSaleProducts={handlePercentDiscount(products)} />
        ) : (
          <div className="no-product">
            <img src="/images/logo.jpg" />
            <span style={{ color: "#d70018", fontWeight: 600 }}>Not found</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
