import React, { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
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
      ></ins>
    </>
  );
};

export default AdsComponent;
