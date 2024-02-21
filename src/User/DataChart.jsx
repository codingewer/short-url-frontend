import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineController,
} from "chart.js";

import "./Profile.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineController
);

function DataChart() {
    const [selectedOption, setSelectedOption] = useState("weekly");

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
    const getlastDays = (num) => {
      const result = [];
      const today = new Date();
      for (let i = 0; i < num; i++) {
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - i
        );
        const options = { day: "numeric", weekday: "long", month: "long" };
        result.push(date.toLocaleDateString("tr-TR", options));
      }
  
      return result;
    };
  
    const labels = selectedOption === "weekly" ? getlastDays(7) : getlastDays(30);
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
                  25, 39, 50, 71, 86, 97, 120, 10, 300, 46, 90, 86, 70, 120, 12,
                  39, 50, 71, 86, 10, 120, 25, 39, 50, 0, 86, 97, 1, 12, 29,
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
                  25, 39, 50, 71, 86, 97, 120, 10, 300, 46, 90, 86, 70, 120, 12,
                  39, 50, 71, 86, 10, 120, 25, 39, 50, 0, 86, 97, 1, 12, 29,
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
                  25, 39, 50, 71, 86, 97, 120, 10, 300, 46, 90, 86, 70, 120, 12,
                  39, 50, 71, 86, 10, 120, 25, 39, 50, 0, 86, 97, 1, 12, 29,
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
    <div>
          <div className="urls-details">
            <div className="urls-detail">
              <span>123</span>
              <span>Link</span>
            </div>
            <div className="urls-detail">
              <span>123</span>
              <span>Tıklama</span>
            </div>
            <div className="urls-detail">
              <span>123</span>
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
  )
}

export default DataChart