import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { CreateSelectListItem, getAllSelectList } from "../../../../../actions/SelectListAction";
import { message } from "antd";

function CreateInfoFilter() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [addOption, setAddOption] = useState([]);

  const handleAddOption = () => {
    const newOption = {
      index: Math.random(),
      value: "",
    };
    setAddOption([...addOption, newOption]);
  };

  const handleRemoveOption = (option) => {
    let newListOption = [...addOption];
    newListOption = newListOption.filter((item) => item.index !== option.index);

    setAddOption(newListOption);
  };

  const handleChangeValueOption = (option, e) => {
    const newListOption = [...addOption];
    const index = newListOption.findIndex((item) => item.index === option.index);

    newListOption[index].value = e.target.value;
    setAddOption(newListOption);
  };

  const createArrayOption = (arr) => {
    let options = [];
    arr = arr.map((item) => options.push(`${item.value}`));
    return options;
  };

  const onSubmit = async (data, e) => {
    if (!data.name) {
      message.error({
        content: "Name is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!data.property) {
      message.error({
        content: "Property is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    if (!addOption?.[0]?.value) {
      message.error({
        content: "Option is required!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
      return;
    }
    console.log("addOption", addOption);
    const options = createArrayOption([...addOption]);
    const newData = { ...data, options };
    await dispatch(CreateSelectListItem(newData));
    setAddOption([]);
    e.target.reset();
    dispatch(getAllSelectList());
  };

  return (
    <div className="update-filter-info">
      <span>Tạo nhóm thể loại</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Tên</label>
        <input {...register("name")} placeholder="Name ... " />
        <label>Thuộc tính</label>
        <input {...register("property")} placeholder="Property ..." />
        <label>Lựa chọn</label>
        <div className="option-list">
          {addOption.map((option, index) => (
            <div className="option-list-item" key={index}>
              <input
                value={option.value}
                placeholder="Option ..."
                onChange={(e) => {
                  handleChangeValueOption(option, e);
                }}
              />
              <span onClick={() => handleRemoveOption(option)}>
                <AiOutlineClose />
              </span>
            </div>
          ))}
        </div>
        <span onClick={handleAddOption}>Thêm lựa chọn</span>
        <button type="submit">Tạo</button>
      </form>
    </div>
  );
}

export default CreateInfoFilter;
