import "./App.css";
import Home from "./User/Userlogin";
import NotFound from "./Url/NotFound";
import ShortenedUrl from "./Url/ShortenedUrl";
import ShortUrl from "./Url/ShortUrl";
import Login from "./User/Login";
import Register from "./User/Register";
import TopBar from "./Bars/TopBar";
import Userlogin from "./User/Userlogin";
import Footer from "./Bars/Footer";
import Profile from "./User/Profile";
import ControlPanel from "./Admin/ControlPanel";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <TopBar/>
        <Routes>
          <Route path="/login" element={<Userlogin />} />
          <Route path="/shorturl" element={<ShortUrl />} />
          <Route path="/" element={<Navigate to="/shorturl" />} />
          <Route path="/:shortenedUrl" element={<ShortenedUrl />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/controlpanel/*" element={<ControlPanel/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
