import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AdSense from "react-adsense";
import "./Ads.css"

function ShortenedUrl() {
  const { shortenedUrl } = useParams();
  const { adIndex } = useParams();
  const [url, setUrl] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8180/url/get/" + shortenedUrl)
      .then(function (response) {
        setUrl(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
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
      <div className="ad-content" >
        <AdSense.Google
          style={{ display: "block", backgroundColor: "green" }}
          client="pub-4301229156748291" // AdSense yayıncı kimliği
          slot="3634852612"
          format="auto"
          responsive="true"
          onAdLoaded={() => console.log("Reklam yüklendi")}
          onAdFailed={() => console.log("Reklam yüklenemedi")}
        />
      </div>
      <button onClick={handleSkip}>Reklamı Göster</button>
    </div>
  );
}

export default ShortenedUrl;
