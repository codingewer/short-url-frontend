import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

const AdsComponent = () => {
  const sitedata = useSelector((state) => state.settings.data);
  const status = useSelector((state) => state.settings.success);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
    loadAdScript();
  }, [dispatch]);

  useEffect(() => {
    loadAdScript();
  }, [sitedata]);

  const loadAdScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  };

  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Reklamın yüklendiğini kontrol etmek için bir DOM query seçicisi kullan.
    const adElement = document.querySelector('.adsbygoogle');
    if (adElement && adElement.offsetHeight > 0) {
      setAdLoaded(true);
    }
  }, []);

  console.log("dedected", adLoaded);
  const ads =
    sitedata !== null
      ? {
          slot: sitedata.AdSlot,
          client: sitedata.AdClient,
        }
      : {
          slot: "",
          client: "",
        };
  return (
    <>
    {
      status &&
      <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "490px" }}
      data-ad-client= {ads.client}  
      data-ad-slot={ads.slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      >
      Reklam
      </ins>
      }
    </>
  );
};

export default AdsComponent;
