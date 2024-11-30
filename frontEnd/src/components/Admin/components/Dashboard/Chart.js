import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../../actions/OrderAction";

function ChartDashboard() {
  const dispatch = useDispatch();
  const allOrder = useSelector((state) => state.allOrder.order);

  const numberOfOrdersOnMonth = (month) => {
    if (allOrder) {
      return allOrder.filter((order) => {
        const allOrder = new Date(order.createdAt).getMonth();
        if (allOrder + 1 === month) {
          return order;
        }
      }).length;
    }
    return;
  };

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const chartOptions = {
    series: [
      {
        name: "Monthly bill",
        data: [
          numberOfOrdersOnMonth(1) + 1,
          numberOfOrdersOnMonth(2) + 1,
          numberOfOrdersOnMonth(3) + 1,
          numberOfOrdersOnMonth(4) + 1,
          numberOfOrdersOnMonth(5) + 1,
          numberOfOrdersOnMonth(6) + 1,
          numberOfOrdersOnMonth(7) + 5,
          numberOfOrdersOnMonth(8) + 9,
          numberOfOrdersOnMonth(9) + 1,
          numberOfOrdersOnMonth(10) + 1,
          numberOfOrdersOnMonth(11) + 1,
          numberOfOrdersOnMonth(12) + 1,
        ],
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };
  return (
    <div className="dashboard-middle-chart">
      <Chart options={chartOptions.options} series={chartOptions.series} type="line" width="400" />
    </div>
  );
}

export default ChartDashboard;
