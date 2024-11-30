import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getproductById, removeProductById, saveProduct } from "../../../../actions/product/ProductAction";
import { getAllSelectList } from "../../../../actions/SelectListAction";

function AdminUpdateProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const detailProduct = useSelector((state) => state.getProductById.product);
    const SelectList = useSelector((state) => state.selectList.List);
    const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
    const { List } = useSelector((state) => state.allTypeProduct);

    useEffect(() => {
        if (detailProduct?.image) {
            setImage(detailProduct.image);
        }
    }, [detailProduct]);

    useEffect(() => {
        dispatch(getproductById(id));
        return () => {
            dispatch(removeProductById());
        };
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getAllSelectList());
    }, []);

    const handleFileImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        let formData = new FormData();

        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("amount", data.amount);
        formData.append("salePrice", data.salePrice);
        formData.append("type", activeTypeProduct ? activeTypeProduct : detailProduct.type);
        formData.append("image", image);
        formData.append("_id", id);
        
        try {
            await dispatch(saveProduct(formData));
            navigate("/admin/product");
        } catch (error) {
            console.error(error);
        }
    };

    const MenuFirmProduct = (item) => (
        <div
            className={
                activeTypeProduct
                    ? activeTypeProduct === item.name
                        ? `filter-menu-firm-item active`
                        : "filter-menu-firm-item"
                    : detailProduct.type === item.name
                        ? `filter-menu-firm-item active`
                        : "filter-menu-firm-item"
            }
            onClick={() => HandleFilterProductByType(item.name)}
        >
            <img src={item.img} alt={item.name} />
        </div>
    );

    const HandleFilterProductByType = (name) => {
        setActiveTypeproduct(name);
    };

    return (
        <div className="admin-create">
            <span>Update Product</span>
            {detailProduct ? (
                <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <label>Name</label>
                    <input
                        {...register("name", { required: true })}
                        placeholder="Name"
                        defaultValue={detailProduct.name}
                    />
                    <label>Amount</label>
                    <input
                        {...register("amount", { required: true, min: 0 })}
                        placeholder="Amount"
                        type="number"
                        defaultValue={detailProduct.amount}
                    />
                    {errors.amount && <p style={{ color: "red" }}>Amount cannot be negative</p>}
                    
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <label>Price</label>
                            <input
                                {...register("price", { required: true, min: 0 })}
                                placeholder="Price"
                                type="number"
                                defaultValue={detailProduct.price}
                            />
                            {errors.price && <p style={{ color: "red" }}>Price cannot be negative</p>}
                        </div>
                        <div>
                            <label>Sale Price</label>
                            <input
                                {...register("salePrice", { required: true, min: 0 })}
                                placeholder="Sale Price"
                                type="number"
                                defaultValue={detailProduct.salePrice}
                            />
                            {errors.salePrice && <p style={{ color: "red" }}>Sale price cannot be negative</p>}
                        </div>
                    </div>
                    
                    <label>Brand</label>
                    <div className="filter-menu-firm">
                        {List ? List.map((item) => MenuFirmProduct(item)) : ""}
                    </div>

                    <label>Operation system</label>
                    {SelectList && SelectList.length > 0 ? (
                        SelectList.map((item) => (
                            <div className="select-type" key={item.property}>
                                <select {...register(item.property)} defaultValue={detailProduct[item.property]}>
                                    {item.options.map((x) => (
                                        <option key={x} value={x}>
                                            {x}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))
                    ) : (
                        ""
                    )}

                    <label>Image</label>
                    <input
                        type="file"
                        {...register("image")}
                        onChange={handleFileImageChange}
                    />
                    <button type="submit">Update Product</button>
                </form>
            ) : (
                ""
            )}
        </div>
    );
}

export default AdminUpdateProduct;
