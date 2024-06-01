import React, { useEffect } from "react";
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
