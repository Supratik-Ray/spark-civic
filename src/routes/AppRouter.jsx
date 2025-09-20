import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import ReportIssuePage from "../pages/ReportIssuePage";
import MyIssuesPage from "../pages/MyIssuesPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
    
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportIssuePage/>} />
        <Route path="/my-issues" element={<MyIssuesPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
