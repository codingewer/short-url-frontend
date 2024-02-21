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
import Faq from "./Pages/Faq";
import ContactUs from "./Pages/ContactUs";
import BalanceRequest from "./User/BalanceRequest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Userlogin />} />
          <Route path="/" element={<ShortUrl />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/" element={<Navigate to="/shorturl" />} />
          <Route path="/l/:shortenedUrl/r/:adIndex" element={<ShortenedUrl />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard/*" element={<Profile />} />
          <Route path="/balancereqs" element={<BalanceRequest/> } />
          <Route path="/controlpanel/*" element={<ControlPanel />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
