import React from "react";
import { AiOutlineForm, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteProduct,
  paginationProduct,
} from "../../../../actions/product/ProductAction";
import { formatPrice } from "../../../../unitls";

function Product(props) {
  const { product, number } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);

  const handleDeleteProduct = async (id) => {
    await dispatch(DeleteProduct(id));
    dispatch(paginationProduct(currentPage));
  };
  return (
    <tr>
      <td>{number + 1}</td>
      <td>
        <img src={product.image}></img>
      </td>
      <td>{product.name}</td>
      <td>{formatPrice(product.salePrice)}</td>
      <td>{product.type}</td>
      <td>{product.amount}</td>
      <td>
        <AiOutlineDelete
          style={{ color: "#000" }}
          onClick={() => handleDeleteProduct(product._id)}
        />
        <Link
          style={{ marginLeft: 10, color: "#000" }}
          to={`/admin/product/update/${product._id}`}
        >
          <AiOutlineEdit />
        </Link>
        <Link
          style={{ marginLeft: 10, color: "#000" }}
          to={`/admin/product/reviewProduct/${product._id}`}
        >
          <AiOutlineForm />
        </Link>
      </td>
    </tr>
  );
}

export default Product;
