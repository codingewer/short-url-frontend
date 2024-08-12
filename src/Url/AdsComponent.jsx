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
useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      aclib.runBanner({
        zoneId: '8620998',
      });
    `;
    document.getElementById('ad-banner').appendChild(script);
  }, []);
  
  return (
    <>
       <div id="ad-banner"></div>
    </>
  );
};

export default AdsComponent;
