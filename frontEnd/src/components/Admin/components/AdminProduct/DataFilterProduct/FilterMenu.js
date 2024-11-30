import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dropdown, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelectListItemById,
  getAllSelectList,
  UpdateSelectListItem,
} from "../../../../../actions/SelectListAction";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";

function FilterMenu() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [chooseSelectItem, setChooseSelectItem] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const filterMenuList = useSelector((state) => state.selectList.List);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  const showModal = (item) => {
    setChooseSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setChooseSelectItem(undefined);
  };

  const handleAddOption = () => {
    const newOption = "";
    setChooseSelectItem({
      ...chooseSelectItem,
      options: [...chooseSelectItem.options, newOption],
    });
  };

  const handleRemoveOption = (option, index) => {
    let newChooseSelectItem = { ...chooseSelectItem };
    const newOptions = newChooseSelectItem.options.filter((item, indexItem) => indexItem !== index);
    setChooseSelectItem({ ...chooseSelectItem, options: newOptions });
  };

  const handleChangeValueOption = (option, index, e) => {
    const content = e.target.value;
    let newChooseSelectItem = { ...chooseSelectItem };
    newChooseSelectItem.options[index] = content;

    setChooseSelectItem(newChooseSelectItem);
  };

  const onSubmit = async (data, e) => {
    await dispatch(UpdateSelectListItem(chooseSelectItem));
    handleCancel();
    dispatch(getAllSelectList());
  };

  const filterMenuItemAntd = (item, i) => (
    <div key={i} className="filter-menu-item">
      <div className={`filter-menu-item-name`}>
        <Dropdown overlay={menuShow(item)} trigger={["click"]}>
          <span className="ant-dropdown-link">
            {item.name}
            {/* <AiOutlineDown /> */}
          </span>
        </Dropdown>
      </div>
    </div>
  );

  const removeSelectItem = async (item) => {
    await dispatch(deleteSelectListItemById(item._id));
    dispatch(getAllSelectList());
  };

  const menuShow = (menuItem) => (
    <div className="menu-show">
      <div className="menu-show-list">
        {menuItem.options.map((item, i) => (
          <div key={i} className={`menu-show-item`}>
            {item}
          </div>
        ))}
      </div>

      <div className="menu-show-btn">
        <button className="update" onClick={() => showModal(menuItem)}>
          Update
        </button>
        <button className="update" onClick={() => removeSelectItem(menuItem)}>
          Delete
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          padding: " 16px 16px 0px 16px",
          fontWeight: 600,
          fontSize: 17,
        }}
      >
        <span>Category</span>
      </div>
      <div className="filter-menu">
        {filterMenuList && filterMenuList.length > 0
          ? filterMenuList.map((item, i) => filterMenuItemAntd(item, i))
          : ""}
        {chooseSelectItem ? (
          <Modal title={`Update ${chooseSelectItem.name}`} open={isModalVisible} onCancel={handleCancel} footer={false}>
            <form onSubmit={handleSubmit(onSubmit)} className="form-update-select">
              <input {...register("name")} placeholder="Name ... " defaultValue={chooseSelectItem.name} />
              <input {...register("property")} placeholder="Property ..." defaultValue={chooseSelectItem.property} />
              <div className="option-list">
                {chooseSelectItem.options.map((option, index) => (
                  <div className="option-list-item" key={index}>
                    <input
                      value={option}
                      placeholder="Option ..."
                      onChange={(e) => {
                        handleChangeValueOption(option, index, e);
                      }}
                    />
                    <span onClick={() => handleRemoveOption(option, index)}>
                      <AiOutlineClose />
                    </span>
                  </div>
                ))}
              </div>
              <span onClick={handleAddOption}>More options</span>
              <button type="submit">Create</button>
            </form>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default FilterMenu;
