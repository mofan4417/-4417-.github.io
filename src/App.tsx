import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import ServiceObjects from "./pages/ServiceObjects";
import ServiceResults from "./pages/ServiceResults";
import JoinUs from "./pages/JoinUs";
import AboutUs from "./pages/AboutUs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SubmitObject from "./pages/SubmitObject";
import Register from "./pages/Register";
import GameStats from "./components/gamification/GameStats";
import GameNotification from "./components/gamification/GameNotification";

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <GameStats />
      <GameNotification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/service-objects" element={<ServiceObjects />} />
        <Route path="/service-results" element={<ServiceResults />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-object" element={<SubmitObject />} />
      </Routes>
    </BrowserRouter>
  );
}
