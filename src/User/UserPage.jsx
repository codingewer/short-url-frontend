import "../Url//ShortUrl.css";
import "./UserPage.css";
import React, { useEffect } from "react";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";
import { useDispatch, useSelector } from "react-redux";
import blockicon from "../assets/icons/blockuser.png";
import unblocicon from "../assets/icons/unblockuser.png";
import loadingicon from "../assets/icons/loading.gif";

import {
  DeleteUrlByAdminAsync,
  DeleteUrlByIdAsync,
  GetUrlByCreatedByAsync,
} from "../Api/Url/UrlSlice";
import { Link, useParams } from "react-router-dom";
import {
  GetUserByIDAsync,
  UpdateUserBlockedAsync,
} from "../Api/User/UserSlice";

function UserPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.url.items);
  const currentURL = window.location.href;
  const urlgetloading = useSelector((state) => state.url.getloading);
  const domain = currentURL.split("/")[2];

  const usersuccess = useSelector((state) => state.users.success);
  const user0 = useSelector((state) => state.users.userrealtime);
  const user = usersuccess ? user0 : {
    UserName:"",
    Blocked:false
  };

  const { id } = useParams();

  const CopyContent = (urll) => {
    navigator.clipboard
      .writeText(domain + "/l/" + urll + "/r/1")
      .then(() => {
        alert("Kopyalandı: " + domain + urll);
      })
      .catch((err) => {
        console.error("Metin kopyalanırken bir hata oluştu:", err);
        alert("Metin kopyalanırken bir hata oluştu!");
      });
  };

  const DeleteContent = async (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      dispatch(DeleteUrlByAdminAsync(id));
    }
  };

  const DeleteUser = () => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      dispatch(DeleteUrlByIdAsync(id));
    }
  };

  const ChangeUserBlocked = () => {
    if (
      window.confirm(
        "Kullanıcıyı kısıtlama/kısıtlamayı kaldırmak istediğinize emin misiniz?"
      )
    ) {
      dispatch(UpdateUserBlockedAsync(id));
    }
  };

  useEffect(() => {
    dispatch(GetUrlByCreatedByAsync(id));
    dispatch(GetUserByIDAsync(id));
  }, [dispatch]);
  console.log(user0);
  const displayItems = items !== null ? items : [];
  return (
    <div className="user-page">
      <div className="user-manage-btns">
        <button type="button" className="card-btns" onClick={DeleteUser}>
          <img src={trashicon} alt="kullanıcıyı sil" />
        </button>{" "}
        <button className="card-btns" onClick={ChangeUserBlocked}>
          {" "}
          <img src={usersuccess &&  user?.Blocked === false ? blockicon : unblocicon} alt="kullanıcıyı sil" />
        </button>
      </div>
      <div className="user-details-card">
        <div className="card-inner-container">
          <h3>Kullanıcı Detayları</h3>
          <div className="card-item">
            <h4>Kullanıcı Adı:</h4>
            <span>{user?.UserName}</span>
          </div>
          <div className="card-item">
            <h4>Mail Adresi:</h4>
            <span>{user?.Mail}</span>
          </div>
        </div>
        {usersuccess && user?.BalanceInfo.userId === user?.ID && (
          <div className="card-inner-container">
            <h3>Banka Bilgiler</h3>
            <div className="card-item">
              <h4>IBAN Sahibi:</h4>
              <span>{user?.BalanceInfo.ibanOwner}</span>
            </div>
            <div className="card-item">
              <h4>IBAN:</h4>
              <span>{user?.BalanceInfo.iban}</span>
            </div>
          </div>
        )}
        {usersuccess && user?.PaparaNo.UserId === user?.ID && (
          <div className="card-inner-container">
            <h3>Papara Bilgiler</h3>
            <div className="card-item">
              <h4>Papara No:</h4>
              <span>{user?.PaparaNo.PaparaNo}</span>
            </div>
          </div>
        )}
      </div>
      <div className="short-url-container">
        <span className="contents-titles">Linkler</span>
        {urlgetloading && <img src={loadingicon} className="loading-icon" />}

        {displayItems.length !== 0 && (
          <div className="last-shortened-urls">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 100 }}>#</th>
                  <th style={{ width: 400 }}>Url</th>
                  <th style={{ width: 200 }}>Tıklanma</th>
                  <th style={{ width: 200 }}>Gelir</th>
                  <th style={{ width: 200 }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ width: 100 }}>{index + 1}</td>
                    <td style={{ width: 400 }}>
                      <a
                        className="url-name"
                        target="_blank"
                        rel="noreferrer"
                        href={domain + "/l/" + item.ShortenedUrl + "/r/1"}
                      >
                        {domain + "/l/" + item.ShortenedUrl}
                      </a>
                    </td>
                    <td style={{ width: 200 }}>{item.ClickCount}</td>
                    <td style={{ width: 200 }}>
                      {parseInt(item.ClickEarning)}
                    </td>

                    <td style={{ width: 200 }}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <button
                          className="card-btns"
                          type="button"
                          onClick={() => CopyContent(item.ShortenedUrl)}
                        >
                          <img src={copyicon} alt="Kopyala" />
                        </button>
                        <button
                          type="button"
                          className="card-btns"
                          onClick={() => DeleteContent(item.ID)}
                        >
                          <img src={trashicon} alt="Sil" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
