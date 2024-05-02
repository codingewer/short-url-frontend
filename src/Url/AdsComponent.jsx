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
var adsbygoogle
  const loadAdScript = () => {
    (adsbygoogle = window.adsbygoogle || []).push({})
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  };

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
