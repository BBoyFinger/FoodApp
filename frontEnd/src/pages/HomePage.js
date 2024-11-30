import React from "react";
import { useSelector } from "react-redux";
import AppChat from "../components/AppChat/AppChat";
import HotSale from "../components/HotSale/HotSale";
import Layout from "../components/Layout/Layout";
import Scroll from "../components/ScrollToTop/Scroll";
import SliderShow from "../components/Slider/SliderShow";

function HomePage() {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      <Layout>
        <SliderShow />
        <HotSale type={"HotSale"} />
      </Layout>
      <Scroll />
      {userInfo && userInfo.isAdmin === false ? <AppChat /> : null}
    </div>
  );
}

export default HomePage;
