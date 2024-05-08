import React, { useEffect, useState } from "react";
import "./BalanceRequest.css";
import doneicon from "../assets/icons/Done.svg";
import pending from "../assets/icons/Hourglass.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetBalanceByUserIDAsync } from "../Api/Balance/BalanceSlice";
import { formatDate } from "./Profile";
import "./UserForm.css";
import { GetHelpRequestsByUserAsync } from "../Api/Help/HelpSlice";

function LastHelpeqs(props) {
  const user0 = useSelector((state) => state.users.userrealtime);
  const items = useSelector((state) => state.help.items);
  const dispatch = useDispatch();

  const data = items !== null ? items : [];
  useEffect(() => {
    dispatch(GetHelpRequestsByUserAsync());
  }, [user0]);
  console.log(items);
  return (
    <div className="balance-requests">
      <h1>Son Destek Talepleri</h1>
      {data.length > 0 &&
        data?.slice(0, 1).map((item, index) => (
          <div key={item.ID} className="balance-request">
            <span style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.Title}
            </span>
            <span style={{ fontWeight: 600, fontSize: 18 }}>
              {formatDate(item.createdAt)}
            </span>
            {item.status ? (
              <img src={doneicon} style={{ height: 32 }} />
            ) : (
              <img src={pending} style={{ height: 32 }} />
            )}
          </div>
        ))}
    </div>
  );
}

export default LastHelpeqs;
