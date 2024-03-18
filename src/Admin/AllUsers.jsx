import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import "./ControlPanelGlobalStyle.css";
import { useSelector } from "react-redux";
import { GetAllUserAsync } from "../Api/User/UserSlice";
import { Link } from "react-router-dom";

function AllUsers() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllUserAsync());
  }, []);
  const [filterUsers, setFilterUsers] = useState([]);
  var users1 = [];
  const handleSearch = (searchTerm) => {
    users1 = users.filter(
      (user) =>
        user.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Mail.includes(searchTerm.toLowerCase())
    );
    setFilterUsers(users1);
  };
  useEffect(() => {
    setFilterUsers(users);
  }, [users]);
  return (
    <div className="cp-data-container">
      <input 
      className="cp-data-search"
      placeholder="Ara(kullanıcı adı)"
       onChange={(e) => handleSearch(e.target.value)}></input>
      {users &&
        users.length > 0 &&
        filterUsers.map((user) => (
          <div key={user.ID} className="cp-data-card">
            <Link to={`/controlpanel/user/${user.ID}`}>{user.UserName}</Link>
            <span>{user.Mail}</span>
          </div>
        ))}
    </div>
  );
}

export default AllUsers;
