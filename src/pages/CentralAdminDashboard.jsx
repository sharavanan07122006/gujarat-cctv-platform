import {
  Camera,
  CheckCircle2,
  XCircle,
  Building2,
  Server,
  Activity,
  Map,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

function CentralAdminDashboard() {
  const departmentData = [
    {
      name: "Police Department",
      cameras: 2,
      online: 2,
      offline: 0,
      status: "Operational",
    },
    {
      name: "Municipal Corporation",
      cameras: 1,
      online: 1,
      offline: 0,
      status: "Operational",
    },
    {
      name: "Transport Department",
      cameras: 1,
      online: 0,
      offline: 1,
      status: "Attention",
    },
    {
      name: "Smart City Mission",
      cameras: 1,
      online: 1,
      offline: 0,
      status: "Operational",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Central Admin Dashboard
            </h1>
          </div>

          <p className="text-sm text-slate-500 mt-1">
            Statewide CCTV infrastructure overview and administration
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-700">
            System Operational
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Cameras */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Total Cameras
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            5
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Registered in platform
          </p>
        </div>

        {/* Online */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Online Cameras
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            4
          </p>

          <p className="text-xs text-emerald-600 mt-1">
            Currently reachable
          </p>
        </div>

        {/* Offline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Offline Cameras
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            1
          </p>

          <p className="text-xs text-red-600 mt-1">
            Requires attention
          </p>
        </div>

        {/* Departments */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-violet-600" />
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Departments
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            4
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Connected departments
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Department Overview */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl">

          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Department Overview
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                CCTV infrastructure by department
              </p>
            </div>

            <Building2 className="w-5 h-5 text-slate-400" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                    Department
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Cameras
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Online
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Offline
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {departmentData.map((department) => (
                  <tr
                    key={department.name}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-sm text-slate-800">
                        {department.name}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center text-sm text-slate-700">
                      {department.cameras}
                    </td>

                    <td className="px-4 py-4 text-center text-sm text-emerald-600 font-medium">
                      {department.online}
                    </td>

                    <td className="px-4 py-4 text-center text-sm text-red-600 font-medium">
                      {department.offline}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          department.status === "Operational"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {department.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Modules */}
        <div className="bg-white border border-slate-200 rounded-xl">

          <div className="p-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">
              Platform Modules
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Central administration access
            </p>
          </div>

          <div className="p-4 space-y-2">

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Camera className="w-4 h-4 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  CCTV Registry
                </p>

                <p className="text-xs text-slate-500">
                  Camera management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Map className="w-4 h-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  GIS Map
                </p>

                <p className="text-xs text-slate-500">
                  Spatial camera overview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <Server className="w-4 h-4 text-violet-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  VMS Systems
                </p>

                <p className="text-xs text-slate-500">
                  Video management systems
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-amber-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  System Health
                </p>

                <p className="text-xs text-slate-500">
                  Camera availability
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* GIS Preview */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              GIS Infrastructure Overview
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Centralised geographic view of registered cameras
            </p>
          </div>

          <Map className="w-5 h-5 text-slate-400" />
        </div>

        <div className="h-48 sm:h-64 bg-slate-100 flex items-center justify-center">
          <div className="text-center px-6">
            <Map className="w-10 h-10 text-slate-400 mx-auto mb-3" />

            <p className="text-sm font-medium text-slate-700">
              GIS Map Integration
            </p>

            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Central administrators can monitor the geographic
              distribution of registered CCTV infrastructure.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CentralAdminDashboard;