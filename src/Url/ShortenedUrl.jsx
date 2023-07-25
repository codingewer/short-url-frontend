import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

function ShortenedUrl() {
  const { shortenedUrl } = useParams();
  const [url, setUrl] = useState({});
  console.log(shortenedUrl);

  //Sayfa yükleninice linki alıp orjinal linke yönlendiren fonksiyon
  useEffect(() => {
    axios
      .get("https://shorturl-ptsr.onrender.com/url/get/" + shortenedUrl)
      .then(function (response) {
        setUrl(response.data);
        console.log(response);
       window.location.replace(response.data.OrginalUrl);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div></div>;
}

export default ShortenedUrl;
 