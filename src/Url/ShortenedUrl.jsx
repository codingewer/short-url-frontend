import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AdSense from "react-adsense";
import "./Ads.css";
import AdsComponent from "./AdsComponent";

function ShortenedUrl() {
  const { shortenedUrl } = useParams();
  const { adIndex } = useParams();
  const [url, setUrl] = useState();

  const currentURL = window.location.href;
  const domain = currentURL.split("r/" + adIndex)[0];
  console.log(domain);
  const handleSkip = () => {
    const nextIndex = parseInt(adIndex) + 1;
    if (nextIndex < 5) {
      window.location.href = domain + "r/" + nextIndex;
    } else {
      window.location.href = "https://github.com";
    }
  };
  console.log(adIndex);
  return (
    <div className="ads-container">
      <div className="ad-content">
      </div>
      <AdsComponent dataAdSlot = "3634852612"/>
      <button onClick={handleSkip}>Reklamı Göster</button>
    </div>
  );
}

export default ShortenedUrl;
