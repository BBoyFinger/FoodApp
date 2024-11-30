import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../../actions/UserAction";

function AdminUpdateUser() {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [detailUser, setDetailUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                setDetailUser(user.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);
    const onSubmit = async (data) => {
        let body = {}
        if (password === confirmPassword) {
            body = {
                _id: detailUser._id,
                name: data.name,
                email: data.email,
                address: data.address,
                phone: data.phone,
                password: data.password
            }
        }
        try {
            await dispatch(updateUser(body));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="admin-create">
            <span>Update User</span>
            {detailUser ? (
                <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <label>Name</label>
                    <input {...register("name")} placeholder="Name" defaultValue={detailUser.name}></input>
                    <label>Email</label>
                    <input {...register("email")} placeholder="Email" defaultValue={detailUser.email}></input>
                    <label>Address</label>
                    <input {...register("address")} placeholder="Address" defaultValue={detailUser.address}></input>
                    <label>Phone</label>
                    <input {...register("phone")} placeholder="Phone" defaultValue={detailUser.phone}></input>
                    <label>Password</label>
                    <input
                        {...register("password")}
                        placeholder="Mật khẩu"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        defaultValue={detailUser.password}
                    ></input>
                    <label>Confirm password</label>
                    <input
                        {...register("repeat password")}
                        placeholder="Xác nhận mật khẩu"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        defaultValue={detailUser.password}
                    ></input>
                    <button type="submit">Update User</button>
                </form>
            ) : (
                ""
            )}
        </div>
    );
}

export default AdminUpdateUser;
