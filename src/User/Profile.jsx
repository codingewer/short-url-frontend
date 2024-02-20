import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import editicon from "../assets/icons/edit-icon.png";
import cancelicon from "../assets/icons/close-icon.png";
import logouticon from "../assets/icons/logout.png";
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
import BalanceRequestPopUp from "./BalanceRequestPopUp";
import UpdateUser from "./UpdateUser";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineController
);

function Profile() {
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
  const [isToggled, setToggled] = useState(true);
  const [isToggled2, setToggled2] = useState(true);
  const handleTogleMenu = () => {
    const linksMenu = document.getElementById("balance-request-form");
    setToggled(!isToggled);
    isToggled
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };

  const handleTogleForm = () => {
    const linksMenu = document.getElementById("update-user-form");
    setToggled2(!isToggled2);
    isToggled2
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };

  const handlelogout = ()=>{
    localStorage.removeItem("logined")
    localStorage.removeItem("user")
    alert("Çıkış yapıldı")
      window.location.href ="/shorturl"
  }
  return (
    <>
    <div className="profile-container">
      <div className="profile-details">
        <div  style={{display:"flex", width:"100%", justifyContent:"end"}} >
        <button className="edit-btn" onClick={handleTogleForm}>
          <img src={isToggled2 ? editicon : cancelicon } alt="Güncelle" />
        </button>
        <button className="edit-btn" onClick={handlelogout}>
          <img src={logouticon} alt="Güncelle" />
        </button>
        </div>
        <UpdateUser />
        <div className="account-details">
          <h4>Profil Bilgileri</h4>
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
            <span>125  &#8378;</span>
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
        <div className="balance-requests">
          <BalanceRequestPopUp balance={200} />
          <h4>Para çekme istekleri</h4>
          <button onClick={handleTogleMenu} className="balance-request-btn">
            {isToggled ? <span>Para Çek</span> : <span>İptal</span>}
          </button>
          <div className="balance-request">
            <span style={{ color: "red", fontWeight: "bold" }}>-125  &#8378;</span>
            <span>12.02.24</span>
            <span style={{ color: "orange", fontWeight: "bold" }}>
              Onay bekliyor...
            </span>
          </div>{" "}
          <div className="balance-request">
            <span style={{ color: "red", fontWeight: "bold" }}>-125  &#8378;</span>
            <span>12.02.24</span>
            <span style={{ color: "green", fontWeight: "bold" }}>
              Onaylandı
            </span>
          </div>{" "}
          <div className="balance-request">
            <span style={{ color: "red", fontWeight: "bold" }}>-125  &#8378;</span>
            <span>12.02.24</span>
            <span style={{ color: "green", fontWeight: "bold" }}>
              Onaylandı
            </span>
          </div>
          <div className="balance-request">
            <span style={{ color: "red", fontWeight: "bold" }}>-125  &#8378;</span>
            <span>12.02.24</span>
            <span style={{ color: "green", fontWeight: "bold" }}>
              Onaylandı
            </span>
          </div>
        </div>
      </div>
      <div className="profile-chart">
        <div className="urls-details">
          <div className="urls-detail">
            <h4>123</h4>
            <span>Link</span>
          </div>
          <div className="urls-detail">
            <h4>123</h4>
            <span>Tıklama</span>
          </div>
          <div className="urls-detail">
            <h4>123</h4>
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
     <Footer />
     <TopBar />
    </>
  );
}

export default Profile;
