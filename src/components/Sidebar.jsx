import {
  LayoutDashboard,
  Camera,
  Map,
  Building2,
  Server,
  Activity,
  X,
  ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "CCTV Registry",
      path: "/cctv-registry",
      icon: Camera,
    },
    {
      name: "GIS Map",
      path: "/gis-map",
      icon: Map,
    },
    {
      name: "Departments",
      path: "/departments",
      icon: Building2,
    },
    {
      name: "VMS Systems",
      path: "/vms-systems",
      icon: Server,
    },
    {
      name: "Health",
      path: "/health",
      icon: Activity,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
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

        {/* Header */}

        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900">
                Gujarat CCTV
              </h1>

              <p className="text-[11px] text-slate-500">
                Integration Platform
              </p>
            </div>

          </div>

          {/* Mobile Close */}

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Platform
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

        {/* Footer */}

        <div className="p-4 border-t border-slate-200">

          <div className="bg-slate-50 rounded-lg p-3">

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-700">
                Model 1 Active
              </span>

            </div>

            <p className="text-[11px] text-slate-500 mt-1">
              Centralised CCTV Registry & GIS Foundation
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;