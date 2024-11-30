import React, { useEffect } from "react";
// import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../actions/product/ProductAction";
import { handlePercentDiscount } from "../../unitls";
import FilterProduct from "./FilterProduct/FilterProduct";
import ListPoducts from "./ListPoducts";
import SortByPrice from "./SortByPrice/SortByPrice";
import "./AllProduct.css";
function AllProduct() {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.allProduct.product);

  useEffect(() => {
    dispatch(getAllProduct());

    return () => {
      return [];
    };
  }, [dispatch]);
  return (
    <section id="hotsale iphone">
      <div className="hotsale">
        <FilterProduct />
        <SortByPrice />
        {product && product.length > 0 ? (
          <>
            <h3>Product</h3>
            <ListPoducts HotSaleProducts={handlePercentDiscount(product)} />
          </>
        ) : (
          <div className="no-product">
            <img src="/images/logo.jpg" />
            <span>No products</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default AllProduct;
