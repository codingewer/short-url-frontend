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
import homegif from "../assets/imgs/shorturlgif.gif";
import { Link } from "react-router-dom";

function Home() {
  const sitedata = useSelector((state) => state.settings.data);
  const dispatch = useDispatch();
  const wwu = [
    {
      title: "Kolayca kaydol!",
      subTitle: `Hemen kaydolun ve kısalttığınız linklere basıldıkça para
      kazanın. Kayıt olurken numara vb. biligilere ihtiyaç duymadan hızlıca kayıt olun ve kazanmaya başalyın`,
      iconUrl: quickicon,
    },
    {
      title: "Güvenilir ve Kolay!",
      subTitle: `+18 reklamların olmamasının ysnı sıra link geçmek diğer sitelere göre daha kolay!`,
      iconUrl: freeicon,
    },
    {
      title: "Grafiklerle Kazancınızı Takip Edin!",
      subTitle: `Grafiklerle hızlıca linklerinizin durumunu takip edin ve kazancınızı nasıl daha iyi yükseltebileceğiniz hakkında fikir sahibi olun.`,
      iconUrl: economyicon,
    },
  ];
  useEffect(() => {
    Aos.init({ duration: 2000 });
    dispatch(GetSiteDataBySiteName());
  }, []);
  const logined = Boolean(localStorage.getItem("logined"));

  return (
    //sayfa tasarımı
    <>
      <TopBar />
      <div data-aos="fade-up" className="home">
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
              {!logined && (
                <div className="login-barner-btn-parent">
                  <Link to="/login" className="login-barner-btn">
                    Giriş Yap
                  </Link>
                  <Link to="/register" className="register-barner-btn">
                    Ücretsiz Kayıt Ol
                  </Link>
                </div>
              )}
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
            <div data-aos="fade-up" key={index} className="wwu-card-center">
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
                <b className="b">{sitedata?.AllUsersLenght}+</b>
              </div>
              <div className="sub-title">Yayıncı</div>
            </div>
            <div className="stats-parent">
              <div className="container">
                <b className="b">{sitedata?.AllLinksLenght}+</b>
              </div>
              <span className="sub-title">Kısaltılan Link</span>
            </div>
            <div className="stats-parent">
              <div className="container">
                <b className="b">{sitedata?.AllClicksLenght}+</b>
              </div>
              <div className="sub-title">Link Tıklanması</div>
            </div>
          </section>
        </div>

        <div data-aos="fade-up" className="gify-container">
          <div className="gify-card">
            <div className="gify-texts">
              <span className="gify-title">Kullanımı Kolay ve Anlaşılır</span>
              <span className="gify-sub-title">
                Link kısaltıp kayıt olmak çok kolay. Sadece mail adresi ile
                kayıt olun link kısaltıp kazancınızı ve görüntülenmelerinizi grafiklerle takip edin.
              </span>
            </div>
            <div className="gify-media">
              <img 
              style={{
                objectFit: "cover",
              }}
              
              className="gify-img" src={homegif} alt="gif" />
            </div>
          </div>
        </div>
        <div data-aos="fade-up" className="hw-cards-container">
          <div data-aos="fade-up" className="hw-cards">
            <div className="hw-card">
              <b className="hw-card-title">Hangi Ödeme Yöntemleri Var?</b>
              <span className="hw-card-sub">
                Ödemelerinizi hesabınıza tanımladığınız banka IBAN bilgisi ya da
                Papara numarası ile hesabınıza kolaylıkla çekebilirsiniz.
              </span>
            </div>
            <div data-aos="fade-up" className="hw-card">
              <b className="hw-card-title">Nasıl link kısaltabilirim?</b>
              <span className="hw-card-sub">
                Kayıt olduktan sonra link kısaltma sayafasına girip istediğiniz
                linki kısaltıp istediğiniz ismi verebilirsiniz. dilerseniz
                açıklama ekleyip link hakkında bilgi verebilirsiniz.
              </span>
            </div>
            <div data-aos="fade-up" className="hw-card">
              <b className="hw-card-title">
                Reklam engelleyicisi ne tür sorunlar yaratır?
              </b>
              <span className="hw-card-sub">
                Reklam engelleyicisi kullanılırsa sayfa yüklenmez ve linkten
                herhangi bir şekilde gelir elde edemezsiniz. linki
                göndereceğiniz kişilere reklam engelleyici kullanmamaları
                gerektiğini iletmenizde fayda var.
              </span>
            </div>
          </div>
          {!logined && (
            <Link to="/register" className="register-hw-btn">
              Ücretsiz Kayıt Ol
            </Link>
          )}
        </div>
        <div data-aos="fade-up" className="gify-container">
          <div className="gify-card">
            <div className="gify-media">
              <img
                className="gify-img"
                src={buffer}
                alt="linklerine değer kat"
              />
            </div>
            <div className="gify-texts">
              <span className="gify-title">Linklerine Değer Kat!</span>
              <span className="gify-sub-title">
                Kolaylıkla kayıt olup linklerinizi değerlendirebilirisiniz. 1000
                tıklanma başına {sitedata?.RevenuePerClick * 1000} &#8378; gelir
                elde edin! Paylaştığınız linkler size pasif gelir sağlasın.
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
