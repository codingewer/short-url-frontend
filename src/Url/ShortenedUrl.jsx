import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";
import { useDetectAdBlock } from "adblock-detect-react";

function ShortenedUrl() {
  const { adIndex } = useParams();
  const adBlockDetected = useDetectAdBlock();

  const currentURL = window.location.href;
  const domain = currentURL.split("r/" + adIndex)[0];
  console.log(domain);
  const index = parseInt(adIndex);
  const handleSkip = () => {
    const nextIndex = index + 1;
    if (nextIndex < 5) {
      window.location.href = domain + "r/" + nextIndex;
    } else {
    }
  };

  console.log(adBlockDetected);
  return (
    <>
      <div className="ads-container">
        <div className="ad-content">
          <AdsComponent dataAdSlot="3634852612" />
1          <button disabled={adBlockDetected} onClick={handleSkip}>
            {index > 3 ? "Linke Git!" : "Reklamı Geç"}
          </button>
          {adBlockDetected ? (
            <span>Reklam engelleme sistemi aktif, reklamı geçemediniz!</span>
          ) : (
            <span>Reklamları geçtikten sonra linke yönledirileceksiniz!</span>
          )}
          <span>{index} / 4</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShortenedUrl;
