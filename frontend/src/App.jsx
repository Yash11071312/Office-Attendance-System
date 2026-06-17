import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employees from "./pages/admin/Employees";
import Attendance from "./pages/admin/Attendance";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    
    <Routes>
      
      <Route path="/admin/attendance" element={<Attendance />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/employees" element={<Employees />} />
      
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
<Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  }
/>
<Route path="/settings" element={<Settings />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    
    
  );
}

export default App;