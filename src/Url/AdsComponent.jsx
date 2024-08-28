import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

const AdsComponent = () => {
  const sitedata = useSelector((state) => state.settings.data);
  const status = useSelector((state) => state.settings.success);

  const dispatch = useDispatch();
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // State to track the current ad index

  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);

  useEffect(() => {}, [sitedata]);

  // Array of ad configurations, each with a different `zoneId`
  const adConfigs = [
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
    { zoneId: '8620998' },
  ];

  useEffect(() => {
    // Load the current ad script dynamically
    const adConfig = adConfigs[currentAdIndex];
    if (adConfig) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = `
        aclib.runBanner({
          zoneId: '${adConfig.zoneId}',
        });
      `;
      document.getElementById('ad-banner').innerHTML = `${adConfig.zoneId}`; // Clear previous ad content
      document.getElementById('ad-banner').appendChild(script);
    }
  }, [currentAdIndex]); // Re-run this effect when the currentAdIndex changes

  // Function to handle "İlgimi Çekmedi" button click
  const handleNextAd = () => {
    if (currentAdIndex < adConfigs.length - 1) {
      setCurrentAdIndex(currentAdIndex + 1); // Move to the next ad
    } else {
      setCurrentAdIndex(0); // Loop back to the first ad
    }
  };
const handleInterested = ()=>{
  document.getElementById("intersetedadid").style.display="flex"
}
  return (
    <>
      <div id="ad-banner" style={{ margin: '20px' }}></div>

      <button onClick={handleNextAd}>İlgimi Çekmedi</button>
      <button onClick={handleInterested} >ilgimi çekti</button>
     <div id="intersetedadid">
     </div>
    </>
  );
};

export default AdsComponent;
