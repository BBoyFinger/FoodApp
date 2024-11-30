import React, { useEffect } from "react";
import { AiOutlineAppstoreAdd, AiOutlineTool } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./adminproduct.css";
import { paginationProduct } from "../../../../actions/product/ProductAction";
import ListProduct from "./ListProduct";
import CircularProgress from "@mui/material/CircularProgress";
import Search from "antd/es/transfer/search";
function AdminProduct() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const { products } = useSelector((state) => state.allProduct.product);
  useEffect(() => {
    dispatch(paginationProduct(currentPage));
  }, [dispatch, currentPage]);
  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <span>Product</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/admin/product/create" className="add-product">
            Create
          </Link>
          <Link to="/admin/product/update/info" className="add-product">
            Manage genre/genre groups
          </Link>
        </div>
      </div>

      {products ? <ListProduct listProducts={products} /> : <CircularProgress style={{ margin: "auto" }} />}
    </div>
  );
}

export default AdminProduct;
