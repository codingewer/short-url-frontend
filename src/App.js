import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";import "./App.css";
import Home from "./User/Userlogin";
import NotFound from "./Url/NotFound";
import ShortenedUrl from "./Url/ShortenedUrl";
import ShortUrl from "./Url/ShortUrl";
import Login from "./User/Login";
import Register from "./User/Register";
import TopBar from "./Bars/TopBar";
import Userlogin from "./User/Userlogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Userlogin />} />
          <Route path="/" element={<Navigate to = {"/home"} />} />
          <Route path="/shorturl" element={<ShortUrl />} />
          <Route path="/:shortenedUrl" element={<ShortenedUrl />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <TopBar/>
    </div>
  );
}

export default App;
