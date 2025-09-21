import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import ReportIssuePage from "../pages/ReportIssuePage";
import AllIssuesPage from "../pages/AllIssuesPage";
import MapView from "../pages/MapView";
import Analytics from "../pages/Analytics";

const AppRouter = () => {
  return (
    <BrowserRouter>
    
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportIssuePage/>} />
        <Route path="/all-issues" element={<AllIssuesPage/>} />
        
        <Route path="/map-view" element={<MapView/>} />
        <Route path="/analytics" element={<Analytics/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
