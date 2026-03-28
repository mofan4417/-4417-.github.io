import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import ServiceObjects from "./pages/ServiceObjects";
import ServiceResults from "./pages/ServiceResults";
import JoinUs from "./pages/JoinUs";
import AboutUs from "./pages/AboutUs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SubmitObject from "./pages/SubmitObject";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/service-objects" element={<ServiceObjects />} />
        <Route path="/service-results" element={<ServiceResults />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/submit-object" element={<SubmitObject />} />
      </Routes>
    </Router>
  );
}
