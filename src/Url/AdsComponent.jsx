import React, { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    const adElements = document.querySelectorAll('.adsbygoogle');
  
    if (adElements.length === 0) {
      console.log('Reklam engelleyici algılandı.');
    } else {
     console.log('Reklam engelleyici algılanmadı.');
    }
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4301229156748291";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    
    
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4301229156748291"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-adtest="on"
        data-full-width-responsive="true"
      >Reklam</ins>
    </>
  );
};

export default AdsComponent;
