import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectDashboard";
import Layout from "./components/Layout";

function App() {

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App