import React from "react";
import { useSelector } from "react-redux";
import AppChat from "../components/AppChat/AppChat";
import Detail from "../components/Detail/Detail";
import Layout from "../components/Layout/Layout";
import Scroll from "../components/ScrollToTop/Scroll";

function DetailPage() {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <Layout>
      <Detail />
      {userInfo && userInfo.isAdmin === false ? <AppChat /> : null}
      <Scroll />
    </Layout>
  );
}

export default DetailPage;
