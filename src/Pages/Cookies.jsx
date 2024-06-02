import React, { useEffect } from "react";
import "./AboutUs.css";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";
import Aos from "aos";
import "aos/dist/aos.css";
import bgbanner from "../assets/imgs/undraw_personal_information_re_vw8a.svg";
import { Helmet } from "react-helmet";

function Cookies() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
  }, []);
  return (
    <>
      <Helmet>
        <title>Linkamon | Çerez Politikası</title>
        <meta name="description" content="Çerez politikamız." />
        <meta name="keywords" content="çerezler, linkamon çerez politikası" />
      </Helmet>
      <TopBar />
      <div data-aos="fade-up" className="contacus-page">
        <div className="faq-banner">
          <div className="home-banner">
            <div className="home-banner-inner">
              <div className="frame-parent">
                <div className="link-shortener-parent">
                  <div className="link-shortener">
                    <h1 className="link-ksaltn">Çerez </h1>
                    <h1 className="para-kazann">Politikası</h1>
                  </div>
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
        </div>
        <div className="contactus-content">
          <div className="about-us-text">
            <h1>Çerez Politikası</h1>
            <p>Son güncellenme: 22/05/2024</p>
            <p>
              Biz, Linkamon, olarak güvenliğinize önem veriyor ve bu Çerez
              Politikası ile siz sevgili ziyaretçilerimizi, web sitemizde hangi
              çerezleri, hangi amaçla kullandığımız ve çerez ayarlarınızı nasıl
              değiştireceğiniz konularında kısaca bilgilendirmeyi hedefliyoruz.
            </p>
            <p>
              Sizlere daha iyi hizmet verebilmek adına, çerezler vasıtasıyla, ne
              tür kişisel verilerinizin hangi amaçla toplandığı ve nasıl
              işlendiği konularında, kısaca bilgi sahibi olmak için lütfen bu
              Çerez Politikasını okuyunuz. Daha fazla bilgi için Gizlilik
              Politikamıza göz atabilir ya da bizlerle çekinmeden iletişime
              geçebilirsiniz.
            </p>
            <h2>Çerez Nedir?</h2>
            <p>
              Çerezler, kullanıcıların web sitelerini daha verimli bir şekilde
              kullanabilmeleri adına, cihazlarına kaydedilen küçük
              dosyacıklardır. Çerezler vasıtasıyla kullanıcıların bilgilerinin
              işleniyor olması sebebiyle, 6698 sayılı{" "}
              <a href="https://sartlar.com/kvkk-nedir">
                Kişisel Verilerin Korunması Kanunu
              </a>{" "}
              gereğince, kullanıcıların bilgilendirilmeleri ve onaylarının
              alınması gerekmektedir.
            </p>
            <p>
              Bizler de siz sevgili ziyaretçilerimizin, web sitemizden en
              verimli şekilde yararlanabilmelerini ve siz sevgili
              ziyaretçilerimizin kullanıcı deneyimlerinin geliştirilebilmesini
              sağlamak adına, çeşitli çerezler kullanmaktayız.
            </p>
            <h3>1. Zorunlu Çerezler</h3>
            <p>
              Zorunlu çerezler, web sitesine ilişkin temel işlevleri
              etkinleştirerek web sitesinin kullanılabilir hale gelmesini
              sağlayan çerezlerdir. Web sitesi bu çerezler olmadan düzgün
              çalışmaz.
            </p>
            <h3>2. Performans Çerezleri</h3>
            <p>
              Performans çerezleri, ziyaretçilerin web sitesine ilişkin kullanım
              bilgilerini ve tercihlerini anonim olarak toplayan ve bu sayede
              web sitesinin performansının geliştirilmesine olanak sağlayan
              çerezlerdir.
            </p>
            <h3>3. Fonksiyonel Çerezler</h3>
            <p>
              Fonksiyonel çerezler, kullanıcıların web sitesine ilişkin geçmiş
              kullanımlarından yola çıkılarak gelecekteki ziyaretlerinde
              tanınmalarını ve hatırlanmalarını sağlayan ve bu sayede web
              sitelerinin kullanıcılara dil, bölge vb. gibi kişiselleştirilmiş
              bir hizmet sunmasına olanak tanıyan çerezlerdir.
            </p>
            <h3>4. Reklam Çerezleri</h3>
            <p>
              Reklam çerezleri, üçüncü taraflara ait çerezlerdir ve web
              sitelerinde ziyaretçilerin davranışlarını izlemek için
              kullanılırlar. Bu çerezlerin amaçları, ziyaretçilerin
              ihtiyaçlarına yönelik ilgilerini çekecek reklamların
              gösterilmesine yardımcı olmaktır ve sorumluluğu çerez sahibi
              üçüncü taraflara aittir.
            </p>
            <h2>Çerezler İle İşlenen Kişisel Veriler Nelerdir?</h2>
            <p>
              Kimlik (isim, soy isim, doğum tarihi vb.) ve iletişim (adres,
              e-posta adresi, telefon, IP, konum vb.) bilgileriniz tarafımızca,
              çerezler (cookies) vasıtasıyla, otomatik veya otomatik olmayan
              yöntemlerle ve bazen de analitik sağlayıcılar, reklam ağları,
              arama bilgi sağlayıcıları, teknoloji sağlayıcıları gibi üçüncü
              taraflardan elde edilerek, kaydedilerek, depolanarak ve
              güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde
              ve süresince, meşru menfaat işleme şartına dayanılarak
              işlenecektir.
            </p>
            <h2>Çerezler Hangi Amaçla Kullanılmaktadır?</h2>
            <p>
              Web sitemizde, şüpheli eylemlerin tespiti yoluyla güvenliğin
              sağlanması, kullanıcıların tercihleri doğrultusunda işlevsellik ve
              performansın artırılması, ürünlerin ve hizmetlerin geliştirilmesi
              ve kişiselleştirilmesi ile bu hizmetlere ulaşımın
              kolaylaştırılması, sözleşmesel ve hukuki sorumlulukların yerine
              getirilmesi amaçlı çerezler kullanmaktadır. Ayrıca kullanıcıların
              daha geniş kapsamlı hizmet sağlayıcılar ile buluşturulabilmesi
              amacıyla reklam çerezleri ve üçüncü taraflarla bilgi paylaşımı da
              söz konusudur.
            </p>
            <h2>Çerezler Nasıl Yönetilmektedir?</h2>
            <span>
              Tüm bu açıklamalardan sonra, hangi çerezlerin kullanılacağı
              konusu, tamamen kullanıcılarımızın özgür iradelerine
              bırakılmıştır. Çerez tercihlerinizi, tarayıcınızın ayarlarından
              silerek ya da engelleyerek, web sitemize adım attığınız anda
              yönetebilir ya da gelecekte, istediğiniz zaman bu ayarları
              değiştirebilirsiniz. Daha ayrıntılı bilgi için Gizlilik
              Politikamıza göz atabilir ya da bizlerle contact@linkamon.com
              e-mail adresi üzerinden iletişime geçebilirsiniz.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cookies;
