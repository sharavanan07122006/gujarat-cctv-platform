import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import CameraRegistry from "./pages/CameraRegistry";
import GISMap from "./pages/GISMap";
import Departments from "./pages/Departments";
import VMSSystems from "./pages/VMSSystems";
import Health from "./pages/Health";

import AdminLogin from "./pages/AdminLogin";
import CentralAdminDashboard from "./pages/CentralAdminDashboard";
import DepartmentAdminDashboard from "./pages/DepartmentAdminDashboard";
function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:ml-64 min-h-screen">

        <Topbar
          setMobileOpen={setMobileOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/cctv-registry"
              element={<CameraRegistry />}
            />

            <Route
              path="/gis-map"
              element={<GISMap />}
            />

            <Route
              path="/departments"
              element={<Departments />}
            />

            <Route
              path="/vms-systems"
              element={<VMSSystems />}
            />

            <Route
              path="/health"
              element={<Health />}
            />
          </Routes>
        </main>

      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Platform */}
        <Route path="/login" element={<AdminLogin />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/cctv-registry"
            element={<CameraRegistry />}
          />
          <Route
            path="/gis-map"
            element={<GISMap />}
          />
          <Route
            path="/departments"
            element={<Departments />}
          />
          <Route
            path="/vms-systems"
            element={<VMSSystems />}
          />
          <Route
            path="/health"
            element={<Health />}
          />
        </Route>

        {/* Admin Platform */}
        <Route element={<AdminLayout />}>

          <Route
            path="/admin/central"
            element={<CentralAdminDashboard />}
          />
          <Route
  path="/admin/department"
  element={<DepartmentAdminDashboard />}
/>

          <Route
            path="/admin/cameras"
            element={<CameraRegistry />}
          />

          <Route
            path="/admin/gis-map"
            element={<GISMap />}
          />

          <Route
            path="/admin/departments"
            element={<Departments />}
          />

          <Route
            path="/admin/vms"
            element={<VMSSystems />}
          />

          <Route
            path="/admin/health"
            element={<Health />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;