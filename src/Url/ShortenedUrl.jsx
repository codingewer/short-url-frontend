import { useDispatch, useSelector, React } from "react-redux";
import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";
import "../Pages/Faq.css";
import { useEffect, useState } from "react";
import { GetUrlByShortenedUrlAsync } from "../Api/Url/UrlSlice";
import { GetAllUrlfaqsAsync } from "../Api/Faq/UrlFaqSlice";
import { DetectAdblock } from "@scthakuri/adblock-detector";
import { Link } from "react-router-dom";
import TopBar from "../Bars/TopBar";

function ShortenedUrl() {
  const { adIndex, shortenedUrl, username } = useParams();
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url.url);
  const success = useSelector((state) => state.url.success);
  const error = useSelector((state) => state.url.error);

  const currentURL = window.location.href;
  const domain = currentURL.split("r/" + adIndex)[0];
  const [index, setIndex] = useState(1);
  const handleSkip = () => {
    setIndex(index + 1);
  };
  const [counter, setCounter] = useState(5);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (counter === 0) {
      setStarted(false);
    }
  }, [counter]);

  useEffect(() => {
    document.title = shortenedUrl;
    if (counter === 0 && success) {
      window.location.href = url.OrginalUrl;
    }
    if (counter < 0) {
      setStarted(false);
      setCounter(0);
    }
  }, [success, counter]);

  const handleStart = () => {
    setStarted(true);
  };

  const [isToggled, setToggled] = useState("");
  const handleTogleMenu = (id) => {
    setToggled(id)
  };
  const urlfaqs = useSelector((state) => state.urlfaqs.items);
  const urlfaqssuccess = useSelector((state) => state.urlfaqs.success);

  const faqsdata = [
    {
      ID: 1,
      Question: "Neden reklam engelleyici kullanmamalıyım?",
      Answer: "Sitenin  çalışması için reklam engelleyici olmaması gerekir.",
    },
    {
      ID: 2,
      Question: "Nasıl linke yönlendirilirim?",
      Answer:
        "İlgimi çekti butonuna basıp ortalama 5 saniye bekledikten sonra linke yönlendiriliceksiniz.",
    },
  ];
  const faqs = urlfaqssuccess && urlfaqs !== null ? urlfaqs : faqsdata;

  const [adblockDedected, setAdblockDedected] = useState(true);

  DetectAdblock((detected) => {
    if (detected) {
      alert("Reklam engelleyicinizi kapatın");
      setAdblockDedected(true);
    } else {
      setAdblockDedected(false);
    }
  });

  useEffect(() => {
    if (!adblockDedected) {
      dispatch(GetUrlByShortenedUrlAsync({username: username , shortenedUrl: shortenedUrl}));
      dispatch(GetAllUrlfaqsAsync());
    }
  }, [dispatch, adblockDedected]);
  const [seed, setSeed] = useState(1);
  const resetSeed = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    resetSeed();
  }, [index]);
  return (
    <>
    <TopBar/>
      <div className="ads-container">
        <div className="ad-content">
          <AdsComponent key={seed} />
          {success ? null : <span style={{ color: "red" }}>{error}</span>}
          {adblockDedected && (
            <span style={{ color: "red" }}>Reklam engelleyiciniz kapatın</span>
          )}
          <div style={{ display: "flex", gap: 12 }}>
            <Link
              disabled={adblockDedected}
              className="skip-btn"
              onClick={handleSkip}
              to={domain + "r/" + index}
            >
              İlgimi Çekmedi
            </Link>
            <button
              disabled={adblockDedected}
              className="intereste-btn"
              onClick={handleStart}
            >
              İlgimi Çekti
            </button>
          </div>
          {started && (
            <span>{counter} saniye sonra linke yönlendirileceksiniz.</span>
          )}
          {counter === 0 && <span>Linke yönlendiriliyorsunuz...</span>}
          <div className="url-info-public">
            <div
              className="url-info-pub"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                flexWrap: "wrap",
                gap: "1px",
              }}
            >
              <span>{success && "@" + url?.CreatedBy}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span>Tıklanma:</span>
                <span>{url?.ClickCount}</span>
              </div>
            </div>
            <div
              className="url-info-pub"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "12px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                {url?.ShortenedUrl}
              </span>
              <span
                style={{
                  textAlign: "left",
                }}
              >
                {url?.Description}
              </span>
            </div>
          </div>
        </div>
        <div className="faq-content">
          <h2>Sıkça Sorulan Sorular</h2>
          {faqs.map((faq, index) => (
            <div className="faq-card" key={index}>
              <button onClick={() => handleTogleMenu(faq.ID)}>
                <span>{faq.Question}</span>
              </button>
              <span
                style={{
                  display: isToggled === faq.ID ? "block" : "none",
                }}
              className="faq-card-content" id={faq.ID}>
                {faq.Answer}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShortenedUrl;
