import { Dropdown } from "antd";
import "./filtermenu.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypeProduct } from "../../../actions/ListTypeProductAction";
import { filterProductByRandomField } from "../../../actions/product/ProductAction";
import { getAllSelectList } from "../../../actions/SelectListAction";

function FilterMenu() {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState({});
  const filterMenuList = useSelector((state) => state.selectList.List);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(filterProductByRandomField(dataFilter));
  }, [dataFilter]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const filterMenuItemAntd = (item, i) => (
    <div key={i} className="filter-menu-item">
      <div className={dataFilter[`${item.property}`] ? `filter-menu-item-name active` : `filter-menu-item-name`} onClick={() => handleClickMenuShow(item, item.options)}>
        {item.name}
        {/* <Dropdown overlay={menuShow(item, item.options)} trigger={["click"]}>
          <span className="ant-dropdown-link">
            {dataFilter[`${item.property}`] ? dataFilter[`${item.property}`] : item.name}
          </span>
        </Dropdown> */}
      </div>
    </div>
  );

  // const menuShow = (menuItem, arrItem) => (
  //   <div className="menu-show">
  //     <div className="menu-show-list">
  //       {arrItem.map((item, i) => (
  //         <div key={i} className={`menu-show-item`} onClick={() => handleClickMenuShow(item, menuItem)}>
  //           {item}
  //         </div>
  //       ))}
  //     </div>

  //     <div className="menu-show-btn">
  //       <button className="cancel" onClick={() => CancelChooseMenuShow(menuItem, arrItem)}>
  //         Refresh
  //       </button>
  //     </div>
  //   </div>
  // );

  const handleClickMenuShow = (item, menuItem) => {
    const data = {};
    data[`type`] = item.name

    setDataFilter({ ...dataFilter, ...data });
  };

  // const CancelChooseMenuShow = (menuItem, arrItem) => {
  //   delete dataFilter[`${menuItem.property}`];
  //   const newDataFilter = { ...dataFilter };
  //   setDataFilter(newDataFilter);
  // };

  const MenuFirmProduct = (item, i) => (
    <div
      key={i}
      className={dataFilter[`type`] === item.name ? `filter-menu-firm-item active` : "filter-menu-firm-item"}
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = async (name) => {
    if (dataFilter.type === name) {
      delete dataFilter[`type`];
      const newDataFilter = { ...dataFilter };
      setDataFilter({ ...newDataFilter });
    } else {
      setDataFilter({ ...dataFilter, type: name });
    }
  };

  return (
    <div style={{ width: "100%", display: "gird", gridTemplateColumns: "2fr 1fr" }}>
      <div style={{ marginRight: 60 }}>
        <h3>Category</h3>
        <div className="filter-menu">
          {filterMenuList && filterMenuList.length > 0
            ? filterMenuList.map((item, i) => filterMenuItemAntd(item, i))
            : ""}
        </div>
      </div>
      <div style={{ marginRight: 60 }}>
        <h3>Category</h3>
        <div className="filter-menu-firm">{List ? List.map((item, i) => MenuFirmProduct(item, i)) : ""}</div>
      </div>
    </div>
  );
}

export default FilterMenu;
