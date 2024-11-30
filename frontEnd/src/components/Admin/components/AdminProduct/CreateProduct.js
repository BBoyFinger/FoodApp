import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";
import { editCurrentPage, saveProduct } from "../../../../actions/product/ProductAction";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { message } from "antd";

function CreateProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {} });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [activeTypeProduct, setActiveTypeproduct] = useState("");
    const SelectList = useSelector((state) => state.selectList.List);
    const { pages } = useSelector((state) => state.allProduct.product);
    const { List } = useSelector((state) => state.allTypeProduct);

    useEffect(() => {
        dispatch(getAllSelectList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllTypeProduct());
    }, [dispatch]);

    // Handle image change
    const handleFileImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Form submission
    const onSubmit = async (data) => {
        // Validate numerical values for being non-negative
        if (data.amount < 0 || data.price < 0 || data.salePrice < 0) {
            message.error({
                content: "Quantity, price, and sale price cannot be negative!",
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

        // Validate required fields and image
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
        if (!data.amount) {
            message.error({
                content: "Amount is required!",
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
        if (!data.price) {
            message.error({
                content: "Price is required!",
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
        if (!data.salePrice) {
            message.error({
                content: "Sale price is required!",
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

        // If data is valid, proceed to submit the form
        if (data) {
            let formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("amount", data.amount);
            formData.append("salePrice", data.salePrice);
            formData.append("type", activeTypeProduct);
            formData.append("image", image);

            try {
                await dispatch(saveProduct(formData));
                await dispatch(editCurrentPage(pages));
                navigate("/admin/product");
                message.success({
                    content: "Add product successfully!",
                    duration: 1,
                    className: "custom-class",
                    style: {
                        position: "absolute",
                        right: "2rem",
                        top: "20px",
                    },
                });
            } catch (e) {
                console.log(e);
                message.error({
                    content: e.message,
                    duration: 1,
                    className: "custom-class",
                    style: {
                        position: "absolute",
                        right: "2rem",
                        top: "20px",
                    },
                });
            }
        }
    };

    const MenuFirmProduct = (item, key) => (
        <div
            key={key}
            className={activeTypeProduct === item.name ? `filter-menu-firm-item active` : "filter-menu-firm-item"}
            onClick={() => HandleFilterProductByType(item.name)}
        >
            <img src={item.img} alt={item.name}></img>
        </div>
    );

    const HandleFilterProductByType = (name) => {
        setActiveTypeproduct(name);
    };

    return (
        <div className="admin-create">
            <span>Create products</span>
            <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="input-mid">
                        <label>Name</label>
                        <input
                            {...register("name", { required: "Name is required!" })}
                            placeholder="Name"
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                    </div>
                    <div className="input-mid">
                        <label>Amount</label>
                        <input
                            {...register("amount", { required: "Amount is required!", min: { value: 0, message: "Amount must be non-negative" } })}
                            placeholder="Amount"
                            type="number"
                        />
                        {errors.amount && <p style={{ color: "red" }}>{errors.amount.message}</p>}
                    </div>
                </div>

                <div className="row"></div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="input-mid">
                        <label>Price</label>
                        <input
                            {...register("price", { required: "Price is required!", min: { value: 0, message: "Price must be non-negative" } })}
                            placeholder="Price"
                            type="number"
                        />
                        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
                    </div>
                    <div className="input-mid">
                        <label>Sale Price</label>
                        <input
                            {...register("salePrice", { required: "Sale price is required!", min: { value: 0, message: "Sale price must be non-negative" } })}
                            placeholder="Sale Price"
                            type="number"
                        />
                        {errors.salePrice && <p style={{ color: "red" }}>{errors.salePrice.message}</p>}
                    </div>
                </div>

                <div>
                    <div>
                        <label>Category Group</label>
                        {SelectList && SelectList.length > 0
                            ? SelectList.map((item, i) => (
                                <div key={i} className="select-type">
                                    <label>{item.name}</label>
                                    <select {...register(`${item.property}`)}>
                                        {item.options.map((x, y) => (
                                            <option key={y} value={x}>
                                                {x}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))
                            : ""}
                    </div>
                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            {...register("image", { required: "Image is required!" })}
                            onChange={handleFileImageChange}
                        />
                    </div>
                </div>

                <label>Category</label>
                <div className="filter-menu-firm">
                    {List ? List.map((item, key) => MenuFirmProduct(item, key)) : ""}
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateProduct;
