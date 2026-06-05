import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectDashboard";
import { DashboardPages } from "./pages/DashboardPages";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app/:section" element={<ProtectedRoute><DashboardPages /></ProtectedRoute>} />
        <Route path="/app/tasks/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App