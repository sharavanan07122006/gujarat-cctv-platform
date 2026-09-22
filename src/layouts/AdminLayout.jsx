import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Camera,
  Map,
  Building2,
  Server,
  Activity,
  ShieldCheck,
  LogOut,
  X,
  Menu,
} from "lucide-react";

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("cctvUser") || "{}"
  );

  const isCentralAdmin = user.role === "CENTRAL_ADMIN";

  const navItems = isCentralAdmin
    ? [
        {
          name: "Admin Dashboard",
          path: "/admin/central",
          icon: LayoutDashboard,
        },
        {
          name: "CCTV Registry",
          path: "/admin/cameras",
          icon: Camera,
        },
        {
          name: "GIS Map",
          path: "/admin/gis-map",
          icon: Map,
        },
        {
          name: "Departments",
          path: "/admin/departments",
          icon: Building2,
        },
        {
          name: "VMS Systems",
          path: "/admin/vms",
          icon: Server,
        },
        {
          name: "System Health",
          path: "/admin/health",
          icon: Activity,
        },
      ]
    : [
        {
          name: "Department Dashboard",
          path: "/admin/department",
          icon: LayoutDashboard,
        },
        {
          name: "My CCTV Registry",
          path: "/admin/cameras",
          icon: Camera,
        },
        {
          name: "My GIS Map",
          path: "/admin/gis-map",
          icon: Map,
        },
        {
          name: "My VMS Systems",
          path: "/admin/vms",
          icon: Server,
        },
        {
          name: "My System Health",
          path: "/admin/health",
          icon: Activity,
        },
      ];

  const handleLogout = () => {
    localStorage.removeItem("cctvUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-white
          border-r border-slate-200
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Logo */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between shrink-0">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900">
                Gujarat CCTV
              </h1>

              <p className="text-[11px] text-slate-500">
                {isCentralAdmin
                  ? "Central Administration"
                  : "Department Administration"}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {isCentralAdmin
              ? "Administration"
              : "Department"}
          </p>

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  px-3 py-2.5
                  rounded-lg
                  text-sm font-medium
                  transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                  `
                }
              >

                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />

                    <span>{item.name}</span>
                  </>
                )}

              </NavLink>
            );
          })}

        </nav>

        {/* User / Logout */}
        <div className="mt-auto p-4 border-t border-slate-200 bg-white shrink-0">

          <div className="bg-slate-50 rounded-lg p-3 mb-3">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-700">
                {isCentralAdmin
                  ? "Central Admin"
                  : "Department Admin"}
              </span>

            </div>

            <p className="text-[11px] text-slate-500 mt-1">
              {isCentralAdmin
                ? "Full platform access"
                : user.department || "Department access"}
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />

            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">

        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>

            <div>

              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                {isCentralAdmin
                  ? "Central Administration"
                  : user.department || "Department Administration"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500">
                {isCentralAdmin
                  ? "Platform management and monitoring"
                  : "Department infrastructure management"}
              </p>

            </div>

          </div>

          {/* User Info */}
          <div className="hidden sm:flex items-center gap-3">

            <div className="text-right">

              <p className="text-sm font-medium text-slate-800">
                {user.username || "Administrator"}
              </p>

              <p className="text-xs text-slate-500">
                {isCentralAdmin
                  ? "Central Administrator"
                  : "Department Administrator"}
              </p>

            </div>

            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>

          </div>

        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;