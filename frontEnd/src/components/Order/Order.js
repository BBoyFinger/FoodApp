import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDistrict, GetAllProvince, GetAllWard, OrderInfo } from "../../actions/OrderAction";
import Payment from "./Payment";
import { message } from "antd";
function Order() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const allProvince = useSelector((state) => state.address.province);
  const allDistrict = useSelector((state) => state.address.district);
  const allWard = useSelector((state) => state.address.ward);

  const [listProvince, setListProvince] = useState(false);
  const [listDistrict, setListDistrict] = useState(false);
  const [listWard, setListWard] = useState(false);

  const [chooseProvince, setChooseProvince] = useState({ name: "Hồ Chí Minh" });
  const [chooseDistrict, setChooseDistrict] = useState({
    name: "District",
  });
  const [chooseWard, setChooseWard] = useState({ name: "Wards" });
  const [isVerified, setIsVerified] = useState(false);

  const handleListProvince = (e) => {
    e.preventDefault();
    setListProvince(!listProvince);
  };
  const handleListDistrict = (e) => {
    e.preventDefault();
    setListDistrict(!listDistrict);
  };
  const handleListWard = (e) => {
    e.preventDefault();
    setListWard(!listWard);
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.salePrice, 0);
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }
  const onSubmit = async (data) => {
    if (!data.name) {
      message.error({
        content: "Please enter name!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "70px",
        },
      });
      setIsVerified(false);
      return;
    }
    if (!data.phone) {
      message.error({
        content: "Please enter phone!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "70px",
        },
      });
      setIsVerified(false);
      return;
    }
    if (!isValidPhoneNumber(data.phone)) {
      message.error({
        content: "Phone is not in the correct format!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "70px",
        },
      });
      setIsVerified(false);
      return;
    }
    if (!data.more) {
      message.error({
        content: "Please enter address!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "70px",
        },
      });
      setIsVerified(false);
      return;
    }
    if (chooseDistrict.name === "District") {
      message.error({
        content: "Please choose district!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "70px",
        },
      });
      setIsVerified(false);
      return;
    }
    if (chooseWard.name === "Wards") {
      message.error({
        content: "Please choose wards!",
        duration: 1,
        className: "custom-class",
        style: {
          position: "absolute",
          right: "2rem",
          top: "70px",
        },
      });
      setIsVerified(false);

      return;
    }
    const Order = {
      to_ward_code: chooseWard.id,
      to_district_id: chooseDistrict.id,

      orderItems: [...cartItems],
      shippingAddress: {
        ...data,
        province: chooseProvince.name,
        district: chooseDistrict.name,
        ward: chooseWard.name,
      },
      totalPrice: totalPrice,
      name: userInfo.name,
      user: userInfo,
    };
    console.log(Order);
    await dispatch(OrderInfo(Order));
    setIsVerified(true);
  };

  useEffect(() => {
    dispatch(GetAllProvince());
  }, []);

  useEffect(() => {
    dispatch(GetAllDistrict(202));
  }, []);

  const handleSelectProvince = (name, id) => {
    setChooseProvince({ name, id });
    setListProvince(!listProvince);
    dispatch(GetAllDistrict(id));
  };

  const handleSelectDistrict = (name, id) => {
    setChooseDistrict({ name, id });
    setListDistrict(!listDistrict);
    dispatch(GetAllWard(id));
  };

  const handleSelectWard = (name, id) => {
    setChooseWard({ name, id });
    setListWard(!listWard);
  };
  return (
    <section id="order">
      <div className="order-content">
        <form className="order-page" onSubmit={handleSubmit(onSubmit)}>
          <div className="customer">
            <h4>CUSTOMER INFORMATION</h4>
            <div className="form-customer">
              <input placeholder="Full Name" {...register("name")}></input>
              <input placeholder="Number phone" {...register("phone")}></input>
            </div>
          </div>
          <div className="address">
            <h4>CHOOSE ADDRESS</h4>
            <div className="address-form">
              <div className="province">
                {allProvince ? (
                  <button className="" onClick={(e) => handleListProvince(e)}>
                    {chooseProvince.name}
                  </button>
                ) : (
                  <button className="" onClick={(e) => handleListProvince(e)}>
                    {chooseProvince.name}
                  </button>
                )}
                {listProvince ? (
                  <div className="select">
                    <div className="select-list">
                      <aside>
                        {allProvince
                          ? allProvince.data.map((item, i) => (
                              <span key={i} onClick={() => handleSelectProvince(item.ProvinceName, item.ProvinceID)}>
                                {item.ProvinceName}
                              </span>
                            ))
                          : ""}
                      </aside>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="province">
                {chooseProvince ? (
                  <button className="" onClick={(e) => handleListDistrict(e)}>
                    {chooseDistrict.name}
                  </button>
                ) : (
                  <button className="" onClick={(e) => handleListProvince(e)} disabled="disabled">
                    {chooseDistrict.name}
                  </button>
                )}
                {listDistrict ? (
                  <div className="select">
                    <div className="select-list">
                      <aside>
                        {allDistrict
                          ? allDistrict.data.map((item, i) => (
                              <span key={i} onClick={() => handleSelectDistrict(item.DistrictName, item.DistrictID)}>
                                {item.DistrictName}
                              </span>
                            ))
                          : ""}
                      </aside>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="province">
                {chooseWard ? (
                  <button className="" onClick={(e) => handleListWard(e)}>
                    {chooseWard.name}
                  </button>
                ) : (
                  <button className="" onClick={(e) => handleListWard(e)} disabled>
                    {chooseWard.name}
                  </button>
                )}
                {listWard ? (
                  <div className="select">
                    <div className="select-list">
                      <aside>
                        {allWard && allWard.data !== null
                          ? allWard.data.map((item, i) => (
                              <span key={i} onClick={() => handleSelectWard(item.WardName, item.WardCode)}>
                                {item.WardName}
                              </span>
                            ))
                          : ""}
                      </aside>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="province">
                <input placeholder="Add, street ... " {...register("more")}></input>
              </div>
            </div>
          </div>
          <Payment isVerified={isVerified} />
        </form>
      </div>
    </section>
  );
}

export default Order;
