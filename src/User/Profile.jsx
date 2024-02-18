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
  const [selectedOption, setSelectedOption] = useState("weekly");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getLastDays = (num) => {
    const result = [];
    const today = new Date();

    for (let i = num; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      result.push(day.toDateString());
    }

    return result;
  };

  const labels = selectedOption === "weekly" ? getLastDays(6) : getLastDays(29);
  const data0 = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "veriş",
        fill: false,
        data:
          selectedOption === "weekly"
            ? [65, 59, 80, 81, 56, 55, 40]
            : [
                25, 39, 50, 71, 86, 97, 120, 25, 39, 50, 71, 86, 97, 120, 25,
                39, 50, 71, 86, 97, 120, 25, 39, 50, 71, 86, 97, 120, 12, 29,
              ],
        backgroundColor: "rgba(252, 103, 54, 1)",
        borderColor: "rgba(252, 103, 54, 1)",
        borderWidth: 3,
        pointRadius: 3,
      },
      {
        type: "bar",
        label: "alış",
        data:
          selectedOption === "weekly"
            ? [65, 59, 80, 81, 56, 55, 40]
            : [
                25, 39, 50, 71, 86, 97, 120, 25, 39, 50, 71, 86, 97, 120, 25,
                39, 50, 71, 86, 97, 120, 25, 39, 50, 71, 86, 97, 120, 12, 29,
              ],
        backgroundColor: "rgba(114, 20, 252, 1)",
        borderColor: "rgba(114, 20, 252, 1)",
        borderWidth: 0,
        barPercentage: 1,
      },
      {
        type: "bar",
        label: "Satış",
        data:
          selectedOption === "weekly"
            ? [65, 59, 80, 81, 56, 55, 40]
            : [
                25, 39, 50, 71, 86, 97, 120, 25, 39, 50, 71, 86, 97, 120, 25,
                39, 50, 71, 86, 97, 120, 25, 39, 50, 71, 86, 97, 120, 12, 29,
              ],
        backgroundColor: "rgba(100, 10, 100, 1)",
        borderColor: "rgba(100, 10, 100, 1)",
        borderWidth: 0,
        barPercentage: 1,
      },
    ],
  };

  function generateLegendItems(chart) {
    const datasets = data.datasets;

    return datasets.map((dataset) => ({
      label: dataset.label,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
    }));
  }

  const data = data0;

  const legendItems = generateLegendItems(data);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Line Chart: Monthly Sales Trend for Products A & B",
      },
      legend: {
        display: true,
        labels: ["Ocak", "Şubat", "Mart", "Nisan"],
      },
    },
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="account-details">
          <div className="account-detail">
            <h4>username: </h4>
            <span>userrrname</span>
          </div>
          <div className="account-detail">
            <h4>email: </h4>
            <span>userrrname</span>
          </div>
          <div className="account-detail">
            <h4>Bakiye: </h4>
            <span>125 TL</span>
          </div>
          <div className="account-detail">
            <h4>Alıcı Ad Soyad: </h4>
            <span>userrrname</span>
          </div>
          <div className="account-detail">
            <h4>IBAN: </h4>
            <span>TR330006100519786457841326</span>
          </div>
        </div>
      </div>
      <div className="profile-chart">
        <div className="urls-details">
          <div className="urls-detail">
            <h2>123</h2>
            <span>Link</span>
          </div>
          <div className="urls-detail">
            <h2>123</h2>
            <span>Tıklama</span>
          </div>
          <div className="urls-detail">
            <h2>123</h2>
            <span>görüntülenme</span>
          </div>
        </div>
        <div className="chart-container">
          <select
            className="chart-select"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <Chart height="300px" data={data} options={options} />
        </div>
        <div className="chart-legends">
          {legendItems.map((item, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
              key={index}
            >
              <div
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  backgroundColor: item.backgroundColor,
                }}
              ></div>
              <span
                className="legend-color"
                style={{
                  backgroundColor: item.backgroundColor,
                  borderColor: item.borderColor,
                }}
              ></span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
