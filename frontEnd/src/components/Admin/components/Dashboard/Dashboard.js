import React from "react";
import "./dashboard.css";
import { BsSearch } from "react-icons/bs";
import {
  AiOutlineBell,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineDollarCircle,
  AiOutlineFileText,
} from "react-icons/ai";
import ChartDashboard from "./Chart";

function Dashboard() {
  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          {/* <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <BsSearch />
              </span>
            </form>
          </div> */}
          <div className="dashboard-top-content">
            <li className="dashboard-top-content-avatar">
              <img
                src="/"
                alt=""
              ></img>
              <span>Đoàn tú</span>
            </li>
            <li className="dashboard-top-content-bell">
              <AiOutlineBell />
            </li>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineShopping />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">1666</span>
                  <span className="title">Tổng bán</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineShoppingCart />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">25</span>
                  <span className="title">Lượt ghé hàng ngày</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineDollarCircle />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">2000</span>
                  <span className="title">Tổng thu nhập</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <AiOutlineFileText />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">1208</span>
                  <span className="title">Tổng đặt hàng</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashboard />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
