import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

const AdsComponent = () => {
  const sitedata = useSelector((state) => state.settings.data);
  const status = useSelector((state) => state.settings.success);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);

  useEffect(() => {}, [sitedata]);

  useEffect(() => {
    if (window.adsbygoogle && !window.adsbygoogle.loaded)
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
  }, []);

  return (
    <>
      {status && (
        <ins
          key={Math.random}
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "300px" }}
          data-ad-client="ca-pub-5425176553873988"
          data-ad-slot="7050201805"
        ></ins>
      )}
    </>
  );
};

export default AdsComponent;
