import "./App.css";
import NotFound from "./Url/NotFound";
import ShortenedUrl from "./Url/ShortenedUrl";
import SideBar from "./Bars/SideBar"
import Userlogin from "./User/Userlogin";
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
import ResetPassword from "./User/ResetPassword";
import UserPage from "./User/UserPage";

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
          <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
          <Route path="/userpage/:id" element ={<UserPage/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
