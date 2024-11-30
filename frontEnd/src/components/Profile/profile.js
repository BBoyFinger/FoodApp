import React, { useEffect, useState } from "react";
import './profile.css'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../actions/UserAction";
import Layout from "../Layout/Layout";

function Profile() {
    const { register, handleSubmit } = useForm();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const [detailUser, setDetailUser] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(userInfo._id);
                setDetailUser(user.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (userInfo._id) {
            fetchUser();
        }
    }, [userInfo._id]);
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
        <Layout>
            <div className="profile-contain">
                <div>
                    <img style={{ borderRadius: "25%" }} src="/images/logo.jpg"></img>
                </div>
                <div>
                    <h1 style={{ padding: "10px" }}>Information</h1>
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
            </div>
        </Layout>
    );
}

export default Profile;
