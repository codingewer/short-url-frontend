import React, { useState } from "react";
import { Bar, Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";

import "./Profile.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);
function Profile() {
  const data = {
    labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz"],
    datasets: [
      {
        type: "line",
        label: "Çizgi Grafiği",
        fill:false,
        data: [2, 10, 50, 25, 20, 30, 45],
        backgroundColor: "rgba(252, 103, 54, 1)",
        borderColor: "rgba(252, 103, 54, 1)",
        borderWidth: 3,
        pointRadius: 3,
      },
      {
        type: "bar",
        label: "alış",
        data: [499, 500, 500, 205, 200, 300, 405],
        backgroundColor: "rgba(114, 20, 252, 1)",
        borderColor: "rgba(114, 20, 252, 1)",
        borderWidth: 0,
        barPercentage: 1,
      },
      {
        type: "bar",
        label: "Satış",
        data: [400, 200, 600, 100, 400, 200, 405],
        backgroundColor: "rgba(100, 10, 100, 1)",
        borderColor: "rgba(100, 10, 100, 1)",
        borderWidth: 0,
        barPercentage: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart: Monthly Sales Trend for Products A & B",
      },
    },
  };

  return (
    <div className="profile-container">
      <div className="profile-details"></div>
      <div className="profile-chart">
        <div className="chart-container">
          <Chart type="line" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
