import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";

function ShortenedUrl() {
  const { adIndex } = useParams();

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
  console.log(adIndex);
  return (
    <>
      <div className="ads-container">
        <div className="ad-content">
          <AdsComponent dataAdSlot="3634852612" />
          <h1>Reklam</h1>
          <button onClick={handleSkip}>
            {index > 3 ? "Linke Git!" : "Reklamı Geç"}
          </button>
          <span>Reklamları geçtikten sonra linke yönledirileceksiniz!</span>
          <span>{index} / 4</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShortenedUrl;
