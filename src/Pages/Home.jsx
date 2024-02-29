import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import economyicon from "../assets/icons/economy.png";
import freeicon from "../assets/icons/free-pay.png";
import quickicon from "../assets/icons/quick-start.png";
import { Link } from "react-router-dom";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";
import { useEffect } from "react";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

function Home() {
  const sitedata = useSelector((state) => state.settings.data);
  const dispatch = useDispatch();
  const wwu = [
    {
      title: "Başlaması çok kolay",
      subTitle: `Hemen kaydolun ve kısalttığınız linklere basıldıkça para
      kazanın`,
      iconUrl: quickicon,
    },
    {
      title: "Herhangi bir ücret ödemenize gerek yok!",
      subTitle: `Kayıt olurken veya link kısaltırken herhangi bir ücret ödemenize gerek yok!`,
      iconUrl: freeicon,
    },
    {
      title: "Linklerinizi kısaltın ve pasif gelir elde edin!",
      subTitle: `Linklerinizi kısaltıp insanları bu linke yönlendirmeniz yeterli! Kazancınızı almak için IBAN bilgisi girip bakiyenizden çekmek istediğiniz miktarı belirtmeniz yeterli`,
      iconUrl: economyicon,
    },
  ];
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  },[dispatch]);
  console.log(sitedata);
  return (
    //sayfa tasarımı
    <>
      <TopBar />
      <div className="home">
        <div className="home-bg-banner"></div>
        <div className="home-content">
          <div className="home-container">
            <div className="get-started">
              <div className="get-started-texts">
                <span className="gs-title">Hızlı kolay ve anlışılır</span>
                <span className="gs-sub-title">
                  Linklerini kısalt paylaş linklerle reklam göster ve
                  reklamlardan kazanç elde et hem başlaması çok kolay!
                </span>
              </div>
              <div className="gs-links">
                <a href="#work-with-us">Daha fazla bilgi edinin</a>
                <Link className="gs-login-link" to="/login">
                  Şimdi başlayın
                </Link>
              </div>
            </div>
            <div id="work-with-us" className="work-with-us">
              <span className="contents-titles">Bizimle çalışın</span>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 48,
                }}
              >
                {wwu.map((item, index) => (
                  <div key={index} className="wwu-card">
                    <div className="wwu-card-icon">
                      <img src={item.iconUrl} alt={item.title} />
                    </div>
                    <div className="wwu-content">
                      <span className="wwu-title">{item.title}</span>
                      <span className="wwu-sub-title">{item.subTitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*!logined && <Navigate to="/home" />}
      {status && <Navigate to="/home" />*/}
      </div>
      <Footer />
    </>
  );
}

export default Home;
