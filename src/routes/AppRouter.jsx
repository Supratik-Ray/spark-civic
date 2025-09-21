import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

import ReportForm from "../pages/ReportForm";

import AdminPage from "../pages/AdminPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/report" element={<ReportForm />} />

        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
