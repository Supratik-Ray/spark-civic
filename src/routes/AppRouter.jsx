import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import AllIssuesPage from "../pages/AllIssuesPage";
import MapView from "../pages/MapView";

import ReportForm from "../pages/ReportForm";
// import AdminPage from "../pages/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import GuestRoute from "./GuestRoute";
import IssueDetails from "../pages/IssueDetails";
import MyIssuesPage from "../pages/MyIssuesPage";
import AssignedIssuesPage from "../pages/AssignedIssuesPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/issues" element={<AllIssuesPage />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route
          path="/report"
          element={
            <ProtectedRoute role="citizen">
              <ReportForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myIssues"
          element={
            <ProtectedRoute role="citizen">
              <MyIssuesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignedIssues"
          element={
            <ProtectedRoute role="admin">
              <AssignedIssuesPage />
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
