import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import economyicon from "../assets/imgs/undraw_investing_re_bov7 1.svg";
import freeicon from "../assets/imgs/undraw_share_link_re_54rx 1.svg";
import quickicon from "../assets/imgs/undraw_maker_launch_re_rq81 1.svg";
import bgbanner from "../assets/imgs/undraw_link_shortener_mvf6 1.svg";
import buffer from "../assets/imgs/undraw_buffer_wq43 1.svg";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";
import { useEffect } from "react";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import homegif from "../assets/imgs/home-png.png";

function Home() {
  const sitedata = useSelector((state) => state.settings.data);
  const dispatch = useDispatch();
  const wwu = [
    {
      title: "Kolayca kaydol!",
      subTitle: `Hemen kaydolun ve kısalttığınız linklere basıldıkça para
      kazanın`,
      iconUrl: quickicon,
    },
    {
      title: "Tamamen üctretsiz!",
      subTitle: `Kayıt olurken veya link kısaltırken herhangi bir ücret ödemenize gerek yok!`,
      iconUrl: freeicon,
    },
    {
      title: "Link geçmek daha kolay!",
      subTitle: `Piyasadaki diğer sitelere göre daha kolay link geçme sayfası.`,
      iconUrl: economyicon,
    },
  ];
  useEffect(() => {
    Aos.init({ duration: 2000 });
    dispatch(GetSiteDataBySiteName());
  }, []);
  return (
    //sayfa tasarımı
    <>
      <TopBar />
      <div className="home">
        <div className="home-banner">
          <div className="home-banner-inner">
            <div className="frame-parent">
              <div className="link-shortener-parent">
                <div className="link-shortener">
                  <h1 className="link-ksaltn">Link kısaltın,</h1>
                  <h1 className="para-kazann">Para Kazanın!</h1>
                </div>
                <div className="linklerinizi-ksaltn-ksaltt">
                  Linklerinizi kısaltın, kısalttığınız linke tıklandıkça pasif
                  gelir elde edin.
                </div>
              </div>
              <div className="login-barner-btn-parent">
                <button className="login-barner-btn">Giriş Yap</button>
                <button className="register-barner-btn">
                  Ücretsiz Kayıt Ol
                </button>
              </div>
            </div>
          </div>
          <img
            className="undraw-link-shortener-mvf6-1-icon"
            loading="lazy"
            alt=""
            src={bgbanner}
          />
        </div>
        <div data-aos="fade-up" className="wwu-cards-container">
          {wwu.map((item, index) => (
            <div key={index} className="wwu-card-center">
              <div className="tamamen-cretsiz-wrapper">
                <h2 className="tamamen-cretsiz">{item.title}</h2>
              </div>
              <div className="registration">
                <div className="balamak-ok-kolay">{item.subTitle}</div>
              </div>
              <img
                className="undraw-freelancer-re-irh4-1-icon"
                loading="lazy"
                alt=""
                src={item.iconUrl}
              />
            </div>
          ))}
        </div>
        <div data-aos="fade-up" className="stats">
          <section className="stats1">
            <div className="stats-parent">
              <div className="container">
                <b className="b">100+</b>
              </div>
              <div className="sub-title">Yayıncı</div>
            </div>
            <div className="stats-parent">
              <div className="container">
                <b className="b">2000+</b>
              </div>
              <span className="sub-title">Kısaltılan Link</span>
            </div>
            <div className="stats-parent">
              <div className="container">
                <b className="b">45000+</b>
              </div>
              <div className="sub-title">Link Tıklanması</div>
            </div>
          </section>
        </div>

        <div data-aos="fade-up" className="gify-container">
          <div className="gify-card">
            <div className="gify-texts">
              <span className="gify-title">Kullanımı Kolay</span>
              <span className="gify-sub-title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tenetur fugit aperiam, maxime dignissimos nulla velit delectus
                quia debitis incidunt vitae.
              </span>
            </div>
            <div className="gify-media">
              <img className="gify-img" src={homegif} alt="gif" />
            </div>
          </div>
        </div>
        <div data-aos="fade-up" className="hw-cards-container">
          <div className="hw-cards">
            <div className="hw-card">
              <b className="hw-card-title">Hangi Ödeme Yöntemleri Var?</b>
              <span className="hw-card-sub">
                Ödemelerinizi hesabınıza tanımladığınız banka ya da Papara
                hesabınıza kolaylıkla çekebilirsiniz.
              </span>
            </div>
            <div className="hw-card">
              <b className="hw-card-title">Hangi Ödeme Yöntemleri Var?</b>
              <span className="hw-card-sub">
                Ödemelerinizi hesabınıza tanımladığınız banka ya da Papara
                hesabınıza kolaylıkla çekebilirsiniz.
              </span>
            </div>
            <div className="hw-card">
              <b className="hw-card-title">Hangi Ödeme Yöntemleri Var?</b>
              <span className="hw-card-sub">
                Ödemelerinizi hesabınıza tanımladığınız banka ya da Papara
                hesabınıza kolaylıkla çekebilirsiniz.
              </span>
            </div>
          </div>
          <button className="register-hw-btn">Ücretsiz Kayıt Ol</button>
        </div>
        <div data-aos="fade-up" className="gify-container">
          <div className="gify-card">
            <div className="gify-media">
              <img className="gify-img" src={buffer} alt="linklerine değer kat" />
            </div>
            <div className="gify-texts">
              <span className="gify-title">Linklerine Değer Kat!</span>
              <span className="gify-sub-title">
                Kolaylıkla kayıt olup linklerinizi değerlendirebilirisiniz. 1000
                tıklanma başına 150 TL gelir elde edin! Paylaştığınız linkler
                size pasif gelir sağlasın.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
