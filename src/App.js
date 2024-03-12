import "./App.css";
import NotFound from "./Url/NotFound";
import ShortenedUrl from "./Url/ShortenedUrl";
import Login from "./User/Login";
import SideBar from "./Bars/SideBar"
import Register from "./User/Register";
import TopBar from "./Bars/TopBar";
import Userlogin from "./User/Userlogin";
import Footer from "./Bars/Footer";
import Profile from "./User/Profile";
import ControlPanel from "./Admin/ControlPanel";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Faq from "./Pages/Faq";
import BalanceRequest from "./User/BalanceRequest";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import UserRegister from "./User/UserRegister";
import ForgotPassword from "./User/ForgotPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <SideBar/>
        <Routes>
          <Route path="/login" element={<Userlogin />} />
          <Route path="/register" element={<UserRegister/>} />
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path = "/terms" element={<Terms/>} />
          <Route path="/l/:shortenedUrl/r/:adIndex" element={<ShortenedUrl />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard/*" element={<Profile />} />
          <Route path="/balancereqs" element={<BalanceRequest/> } />
          <Route path="/controlpanel/*" element={<ControlPanel />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
