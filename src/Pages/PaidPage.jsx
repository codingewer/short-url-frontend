import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./PaidPage.css";
import loadingicon from "../assets/icons/loading.gif";
import { GetPaidBalanceRequestsAsync } from '../Api/Balance/BalanceSlice';
import Aos from "aos";
import "aos/dist/aos.css";

function PaidPage() {
    const paidlist = useSelector((state) => state.balance.paidlist);
    const loading = useSelector((state) => state.balance.loading);
    const dispatch = useDispatch();
    const [showLimit, setShowLimit] = useState(15);
    const hanldeShowMore = () => {
      setShowLimit(showLimit + 25);
    }
    useEffect(() => {
      dispatch(GetPaidBalanceRequestsAsync());
    }, [dispatch]);
    useEffect(() => {
      document.title = 'Linkamon | Ödeme Kanıtları';
    }, []);
    useEffect(() => {
      Aos.init({ duration: 2000 });
    }, []);
  return (
    <>
      <TopBar />
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div data-aos="fade-up" className="paid-list">
          <h1>Ödeme Kanıtları</h1>
        {loading && <img src={loadingicon} className="loading-icon" />}
          {
            paidlist?.slice(0, showLimit).map((paid, index)=>(

          <div key={index} className="paid-card">
            <span
            style={{
                width:"30%",
                textAlign: "left",
            }}
            
            >{paid.user.UserName}</span>
            <span
             style={{
                width:"30%",
                textAlign:"center"
            }}
            >{paid.option ? paid.option : "IBAN"}</span>
            <span
              style={{
                color: "green",
                width:"30%",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              {paid.amount} &#8378;
            </span>
          </div>
            ))
          }
          {showLimit < paidlist?.length && (
              <button
              className="show-more-btn"
              onClick={hanldeShowMore}
              type="button"
              >
              Daha Falza Göster({paidlist.length - showLimit})
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaidPage;
