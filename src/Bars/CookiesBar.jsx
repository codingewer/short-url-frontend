import React from "react";
import CookieConsent from "react-cookie-consent";

function CookiesBar() {
  const handleDecline = () => {
    // Reddetme butonuna tıklandığında yapılacak işlemler
    // Örneğin: Çerez kullanımını reddettimizi belirtmek için bir API isteği gönderebiliriz.
  };
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Anladım ve onaylıyorum"
        declineButtonText="Reddet"
        onDecline={handleDecline}
        cookieName="LinkamonCookies"
        style={{
          background: "#2B373B",
          minHeight: 150,
          fontSize: "18px",
          color: "#fff",
          padding: "10px",
          width: "100vw",
          fontWeight: 700,
        }}
        buttonStyle={{
          color: "white",
          fontSize: "18px",
          background: "#7215fc",
          borderRadius: "5px",
          paddingBlock: 12,
          paddingInline: 24,
          fontWeight: 700,
        }}
        declineButtonStyle={{
          color: "#B888FF",
          fontSize: "18px",
          background: "none",
          borderColor: "#B888FF",
          borderWidth: "3px",
          borderStyle: "solid",
          borderRadius: "5px",
          paddingBlock: 12,
          paddingInline: 24,
          fontWeight: 700,
        }}
        expires={150}
        enableDeclineButton={true}
      >
        Bu site daha iyi bir kullanıcı deneyimi için çerezlerinize ihtiyaç
        duyabilir.
        <a
          target="_blank"
          style={{
            color: "#B888FF",
            fontWeight: 700,
            marginLeft: "10px",
            fontSize: "16px",
          }}
          href="/cookies"
        >
          Çerez politikası
        </a>
      </CookieConsent>
    </>
  );
}

export default CookiesBar;
