import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import AllIssuesPage from "../pages/AllIssuesPage";
import MapView from "../pages/MapView";
import Analytics from "../pages/Analytics";
import ReportForm from "../pages/ReportForm";
import AdminPage from "../pages/AdminPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-issues" element={<AllIssuesPage />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/dashboard" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
