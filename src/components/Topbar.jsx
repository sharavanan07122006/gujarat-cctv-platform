import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

function Topbar({ setMobileOpen }) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

      {/* Left side */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
            Central CCTV Operations
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 truncate">
            Centralised registry and GIS foundation
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-5 ml-3">

        {/* Search - desktop */}
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <Search
            size={17}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none text-sm w-32 lg:w-40"
          />
        </div>

        {/* Notification */}
        <button className="relative text-slate-500 hover:text-slate-800">
          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

      </div>
    </header>
  );
}

export default Topbar;