import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router";
import AdSense from 'react-adsense';

function ShortenedUrl() {
  const { shortenedUrl } = useParams();
  const [url, setUrl] = useState();
  console.log(shortenedUrl);

  //Sayfa yükleninice linki alıp orjinal linke yönlendiren fonksiyon
  useEffect(() => {
    axios
      .get("http://localhost:8180/url/get/" + shortenedUrl)
      .then(function (response) {
        setUrl(response.data.ShortenedUrl);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [showAd, setShowAd] = useState(false);

  const showNextAd = () => {
    setShowAd(true);
  };

  const goToLinkHandler = () => {
    window.location.href = 'https://githbu.com'; // Reklamın tıklanması durumunda yönlendirilecek link
  };

  return (
    <div className="container">
      {showAd && (
        <div>
          <AdSense.Google
            client='pub-4301229156748291' // AdSense yayıncı kimliği
            slot='3634852612' // Reklam slot kimliği
            style={{ display: 'block' }}
            format='auto'
            responsive='true'
            onAdLoaded={() => console.log('Reklam yüklendi')} // Reklam yüklendiğinde tetiklenen fonksiyon
            onAdFailed={() => console.log('Reklam yüklenemedi')} // Reklam yüklenemediğinde tetiklenen fonksiyon
          />
        </div>
      )}
      <button onClick={showNextAd}>Reklamı Göster</button>
      <button onClick={goToLinkHandler}>Githbu.com'a Git</button>
    </div>
  );
}


export default ShortenedUrl;
 