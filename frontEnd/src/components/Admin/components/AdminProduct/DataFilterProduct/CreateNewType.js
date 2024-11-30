import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateNewTypeProduct, getAllTypeProduct } from "../../../../../actions/ListTypeProductAction";
import { message } from "antd";

function CreateNewType() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [image, setImage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
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
    if (!image) {
      message.error({
        content: "Image is required!",
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
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);

    e.target.reset();
    try {
      await dispatch(CreateNewTypeProduct(formData));
      dispatch(getAllTypeProduct());
      message.success({
        content: "Add branch successfully!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
    } catch (e) {
      message.error({
        content: e.message || "Create brand has error!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "20px",
        },
      });
    }
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-type">
      <span>Tạo thể loại</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Tên ... "></input>
        <input type="file" onChange={(e) => handleChangeImage(e)}></input>
        <button type="submit">Tạo</button>
      </form>
    </div>
  );
}

export default CreateNewType;
