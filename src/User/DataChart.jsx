import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
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
import { GetDataByUserIDAsync } from "../Api/ChartData/ChartSlice";

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
  const dispatch = useDispatch();
  const chartdata = useSelector((state) => state.chardata.data);
  const success = useSelector((state) => state.chardata.success);
  const user = useSelector((state) => state.users.userrealtime);
  const data2 = success ? chartdata : [];
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const data0 = {
    datasets: [
      {
        type: "line",
        label: "Kazanç",
        fill: false,
        data: data2.balanceChart,
        backgroundColor: "rgba(252, 103, 54, 1)",
        borderColor: "rgba(252, 103, 54, 1)",
        borderWidth: 3,
        pointRadius: 3,
      },
      {
        type: "bar",
        label: "Görüntülenme",
        data: data2.viewsChart,
        backgroundColor: "rgba(114, 20, 252, 1)",
        borderColor: "rgba(114, 20, 252, 1)",
        borderWidth: 0,
        barPercentage: 1,
      },
    ],
  };

  function generateLegendItems(chart) {
    const datasets = data0.datasets;
    return datasets.map((dataset) => ({
      label: dataset.label,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
    }));
  }
  const legendItems = generateLegendItems(data0);
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

  const days = selectedOption === "weekly" ? 7 : 30;
  useEffect(() => {
    dispatch(GetDataByUserIDAsync(days));
  }, [dispatch, selectedOption]);

  //günlük görüntülenme
  var lastValueBalance  = null
  var lastViews = null;
  if( chartdata != null) {
    const views = Object.values(chartdata.viewsChart);
    lastViews = views[views.length - 1];
    //günlük kazanç
    const balance = Object.values(chartdata.balanceChart);
   lastValueBalance = balance[balance.length - 1];
    lastValueBalance = parseInt(lastValueBalance);
  } 

  var allViews = 0;
  var allBalance = 0;
  if(chartdata !== null){
    allViews = Object.values(chartdata.viewsChart).reduce((acc, curr) => acc + curr, 0);
    allBalance = Object.values(chartdata.balanceChart).reduce((acc, curr) => acc + curr, 0);
  }
console.log(chartdata)
  return (
    <div>
       <div style={{height:100, fontSize:22, fontWeight:500}} className="urls-detail">
          <span>{ user !== null &&parseInt(user.Balance)} &#8378;</span>
          <span>Güncel Bakiye</span>
        </div>
      <div className="urls-details">
        <div className="urls-detail">
          <span>{ user !== null && user.UrlCount}</span>
          <span>Link</span>
        </div>
        <div className="urls-detail">
          <span>{parseInt(allBalance)} &#8378;</span>
          <span> Kazanç</span>
        </div>
        <div className="urls-detail">
          <span>{allViews}</span>
          <span>Görüntülenme</span>
        </div>
      </div>
      <div className="chart-container">
        <select
          className="chart-select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="weekly">Son bir hafta</option>
          <option value="monthly">Son bir ay</option>
        </select>
        <Chart height="300px" data={data0} options={options} />
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
  );
}

export default DataChart;
