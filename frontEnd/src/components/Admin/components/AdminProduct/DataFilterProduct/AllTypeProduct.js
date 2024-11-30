import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteTypeProduct, getAllTypeProduct } from "../../../../../actions/ListTypeProductAction";

function AllTypeProduct() {
  const dispatch = useDispatch();
  const { List } = useSelector((state) => state.allTypeProduct);
  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleRemoveItem = async (item) => {
    await dispatch(deleteTypeProduct(item));
    dispatch(getAllTypeProduct());
  };

  const MenuFirmProduct = (firmItem, i) => (
    <div key={i} className="filter-menu-firm-item" style={{ overflow: "unset" }}>
      <img src={firmItem.img}></img>
      <div className="filter-menu-firm-item-delete" onClick={() => handleRemoveItem(firmItem)}>
        <span className="icon-close">
          <AiOutlineClose />
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="filter-menu-firm">{List ? List.map((item, i) => MenuFirmProduct(item, i)) : ""}</div>
    </div>
  );
}

export default AllTypeProduct;
