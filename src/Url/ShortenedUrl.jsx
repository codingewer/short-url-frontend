import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";
import "../Pages/Faq.css";
import { useDetectAdBlock } from "adblock-detect-react";
import { useEffect, useState } from "react";
import { GetUrlByShortenedUrlAsync } from "../Api/Url/UrlSlice";
import { GetAllUrlfaqsAsync } from "../Api/Faq/UrlFaqSlice";

function ShortenedUrl() {
  const { adIndex, shortenedUrl } = useParams();
  const adBlockDetected = useDetectAdBlock();
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url.url);
  const success = useSelector((state) => state.url.success);
  const loading = useSelector((state) => state.url.loading);

  const currentURL = window.location.href;
  const domain = currentURL.split("r/" + adIndex)[0];
  console.log(domain);
  const index = parseInt(adIndex);
  const handleSkip = () => {
    const nextIndex = index + 1;
    window.location.href = domain + "r/" + nextIndex;
  };
  const [counter, setCounter] = useState(5);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (started) {
      dispatch(GetUrlByShortenedUrlAsync(shortenedUrl));
        console.log("started")
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
    if ( counter === 0 && success) {
      window.location.href = url.OrginalUrl;
    }
  }, [success, counter]);

  const handleStart = () => {
    setStarted(true);
  };
useEffect(() => {
  dispatch(GetAllUrlfaqsAsync());
}, [dispatch]);


  const [isToggled, setToggled] = useState(false);
  const handleTogleMenu = (id) => {
    const linksMenu = document.getElementById(id);
    setToggled(!isToggled);
    isToggled
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };
const urlfaqs = useSelector((state) => state.urlfaqs.items);
const urlfaqssuccess = useSelector((state) => state.urlfaqs.success);

  const faqsdata = [
    {
      ID:1,
      Question: "Neden reklam engelleyici kullanmamalıyım?",
      Answer:
        "Sitenin  çalışması için reklam engelleyici olmaması gerekir.",
    },
    {
      ID:2,
      Question: "Nasıl linke yönlendirilirim?",
      Answer:
        "İlgimi çekti butonuna basıp ortalama 5 saniye bekledikten sonra linke yönlendiriliceksiniz.",
    },
  ];
  const faqs = urlfaqssuccess && urlfaqs !== null ? urlfaqs : faqsdata;
  console.log(urlfaqs);
  return (
    <>
      <div className="ads-container">
        <div className="ad-content">
          <span>{url?.Description}</span>
          <AdsComponent />
          <div style={{ display: "flex", gap: 12 }}>
            <button className="skip-btn" onClick={handleSkip}>
              Reklamı Geç
            </button>
            <button className="intereste-btn" onClick={handleStart}>
              İlgimi Çekti
            </button>
          </div>
          <span>
            {success && "@" + url?.CreatedBy}
          </span>
          {started && (
            <span>{counter} saniye sonra linke yönlendirileceksiniz.</span>
          )}
          {counter ===0 && <span>Linke yönlendiriliyorsunuz...</span>}
        </div>
        <div className="faq-content">
          <h3>Sıkça Sorulan Sorular</h3>
          {
            faqs.map((faq, index) => (
              <div className="faq-card" key={index}>
              <button onClick={() => handleTogleMenu(faq.ID)}>
                <span>{faq.Question}</span>
              </button>
              <span className="faq-card-content" id={faq.ID}>
                {faq.Answer}
              </span>
            </div>
          ))
        }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShortenedUrl;
