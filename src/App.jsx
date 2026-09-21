import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import CameraRegistry from "./pages/CameraRegistry";
import GISMap from "./pages/GISMap";
import Departments from "./pages/Departments";
import VMSSystems from "./pages/VMSSystems";
import Health from "./pages/Health";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-50">

        {/* Sidebar */}

        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Application Area */}

        <div className="lg:ml-64 min-h-screen">

          {/* Topbar */}

          <Topbar
            setMobileOpen={setMobileOpen}
          />

          {/* Page Content */}

          <main className="p-4 sm:p-6 lg:p-8">

            <Routes>

              {/* Dashboard */}

              <Route
                path="/"
                element={<Dashboard />}
              />

              {/* CCTV Registry */}

              <Route
                path="/cctv-registry"
                element={<CameraRegistry />}
              />

              {/* GIS Map */}

              <Route
                path="/gis-map"
                element={<GISMap />}
              />

              {/* Departments */}

              <Route
                path="/departments"
                element={<Departments />}
              />

              {/* VMS Systems */}

              <Route
                path="/vms-systems"
                element={<VMSSystems />}
              />

              {/* Health */}

              <Route
  path="/health"
  element={<Health />}
/>

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;