import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import AllIssuesPage from "../pages/AllIssuesPage";
import MapView from "../pages/MapView";
import Analytics from "../pages/Analytics";
import ReportForm from "../pages/ReportForm";
import AdminPage from "../pages/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import GuestRoute from "./GuestRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-issues" element={<AllIssuesPage />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route
          path="/report"
          element={
            <ProtectedRoute role="citizen">
              <ReportForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
