import React from "react";
import ProductCart from "./ProductCart";

function ListProductCart({ products }) {
  if(!products) return <></>
  return (
    <div className="shopping-cart-list">
      {products.map((product, index) => (
        <ProductCart product={product} key={index} />
      ))}
    </div>
  );
}

export default ListProductCart;
