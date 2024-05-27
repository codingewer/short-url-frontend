import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import settingsico from "../assets/icons/edit-icon.png";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineController,
  Tooltip,
  Legend,
} from "chart.js";

import "./Profile.css";
import { GetDataByUserIDAsync } from "../Api/ChartData/ChartSlice";
import { Link } from "react-router-dom";
import LastUrls from "../Url/LastUrls";
import LastBalanceRequests from "./LastBalanceReqs";
import LastHelpeqs from "./LastHelpReqs";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineController,
  Tooltip,
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
        data: data2?.balanceChart,
        backgroundColor: "rgba(252, 103, 54, 1)",
        borderColor: "rgba(252, 103, 54, 1)",
        borderWidth: 3,
        pointRadius: 3,
      },
      {
        type: "bar",
        label: "Görüntülenme",
        data: data2?.viewsChart,
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
    plugins: {
      tooltip: {
        //one toolptip for all datas
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          title: function () {
            return ;
          },
        },
      },
      legend: { display: false },
      title: {
        display: true,
        text: "Test chart",
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const days = selectedOption === "weekly" ? 7 : 30;
  useEffect(() => {
    dispatch(GetDataByUserIDAsync(days));
  }, [dispatch, selectedOption]);

  //günlük görüntülenme
  var lastValueBalance = null;
  var lastViews = null;
  if (chartdata != null) {
    const views = Object.values(chartdata.viewsChart);
    lastViews = views[views.length - 1];
    //günlük kazanç
    const balance = Object.values(chartdata.balanceChart);
    lastValueBalance = balance[balance.length - 1];
    lastValueBalance = parseInt(lastValueBalance);
  }

  var allViews = 0;
  var allBalance = 0;
  if (chartdata !== null) {
    allViews = Object.values(chartdata.viewsChart).reduce(
      (acc, curr) => acc + curr,
      0
    );
    allBalance = Object.values(chartdata.balanceChart).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }
  useEffect(()=>{
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
  },[])
  return (
    <div>
      <div className="user-details-container">
        <div className="url-details-container">
          <select
            className="chart-select"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="weekly">Son bir hafta</option>
            <option value="monthly">Son bir ay</option>
          </select>
          <div className="urls-details">
            <div className="urls-detail">
              <span>{parseInt(allBalance)} &#8378;</span>
              <span> Kazanç</span>
            </div>
            <div className="urls-detail">
              <span>{allViews}</span>
              <span>Görüntülenme</span>
            </div>
          </div>
        </div>
        <div className="user-details">
          <div className="user-profile">
            <span>@{user?.UserName}</span>
            <Link to={"/dashboard/settings"}>
              <img src={settingsico} alt="" />
            </Link>
          </div>
          <div className="urls-details">
            <div className="urls-detail">
              <span>{user !== null && parseInt(user.Balance)} &#8378;</span>
              <span>Güncel Bakiye</span>
            </div>
            <div className="urls-detail">
              <span>{user !== null && user.UrlCount}</span>
              <span>Link</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <Chart height="400px" width={1000} data={data0} options={options} />
        <div className="chart-legends"></div>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100vw",
        }}
      >
        <LastUrls />
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <LastBalanceRequests page="profile" />
          <LastHelpeqs />
        </div>
      </div>
    </div>
  );
}

export default DataChart;
