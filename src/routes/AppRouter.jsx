import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ReportForm from "../pages/ReportForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
