import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report"  />
        <Route path="/my-issues"  />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
