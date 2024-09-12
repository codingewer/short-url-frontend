import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import doneicon from "../assets/icons/done.svg"
import loadinicotodo from "../assets/icons/23.gif"

const AdsComponent = () => {
  const sitedata = useSelector((state) => state.settings.data);
  const status = useSelector((state) => state.settings.success);
  const [barWidht, setBarWidht] = useState(0)
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url.url);
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // State to track the current ad index
  const [copletedeTodo, setCopleteTodo] = useState(false)
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);

  useEffect(() => { }, [sitedata]);
  const [getDetailsStatus, setGetDetailsStatus] = useState(false)
  const adConfigs = [
    { zoneId: '8735606' },
    { zoneId: '8735762' },
    { zoneId: '8735766' },
    { zoneId: '8735770' },
    { zoneId: '8735774' },
  ];
console.log(url)
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
      document.getElementById('ad-banner').innerHTML = ""; // Clear previous ad content
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
  const handleInterested = () => {
    document.getElementById("btnsonsikpfgvcf").style.display = "none"
    document.getElementById("btndbnmdfnbfggb").style.display = "flex"
    document.getElementById("btnkytfvbhdtyhbrt245fe").style.display = "flex"
      
  }

  const handleGetinfo = () => {
    setBarWidht("50%")
    setTimeout(() => {
      const div = document.getElementById('ad-banner');
      div.children[1].click()
      setGetDetailsStatus(true)
    }, 1500);
    setTimeout(() => {
      setCopleteTodo(true)
    }, 6000);
  }
 const [copleted, setComplleted] = useState(false)
  const handleComplete = () =>{
    setBarWidht("100%")
    setTimeout(() => {
      window.location.href = url.OrginalUrl
      setComplleted(true)
    }, 1500);
  }
  return (
    <>
      <div className="adcontainer" >
        <div id="ad-banner" style={{ marginBottom: '20px' }}></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 12
          }}
        >
          <div
            style={{
              display: "none",
            }}
            id="btndbnmdfnbfggb" >

            <div
              style={{
                left: "-10%"
              }}
              className="baricon"  >
              <img src={doneicon} alt="done" />
            </div>
            <div
              style={{
                left: "40%"
              }}
              className="baricon"  >
              {
                getDetailsStatus &&
                <img
                  style={{
                    width: "80%",
                    height: "30%"
                  }}
                  src={loadinicotodo} alt="done" />
              }
            </div><div
              style={{
                left: "90%"
              }}
              className="baricon"  >
            {
              copleted &&
              <img src={doneicon} alt="done" />
            }
            </div>
            <div className="todo-bar" >
              <div
                style={{
                  width: barWidht
                }}
                className="innertodobar"></div>
            </div>
          </div>
          <button
            style={
              {
                display: "none"
              }
            }
            id="btnkytfvbhdtyhbrt245fe"
            type="button" className="skip-btn" onClick={handleGetinfo} >detaylı bilgi al</button>
        {
          copletedeTodo &&
          <button className="complete-btn" onClick={handleComplete} >Bu aşamayı bitirdim</button>
        }
        </div>
      </div>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }} id="btnsonsikpfgvcf">
        <button id="notintersetedbtn" className="skip-btn" onClick={handleNextAd}>İlgimi Çekmedi</button>
        <button id="tintersetedbtn" className="intereste-btn" onClick={handleInterested} >ilgimi çekti</button>
      </div>
    </>
  );
};

export default AdsComponent;
