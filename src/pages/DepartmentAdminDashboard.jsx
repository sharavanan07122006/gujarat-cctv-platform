import {
  Camera,
  CheckCircle2,
  XCircle,
  Server,
  Activity,
  Map,
  ShieldCheck,
  Clock,
} from "lucide-react";

function DepartmentAdminDashboard() {
  const user = JSON.parse(
    localStorage.getItem("cctvUser") || "{}"
  );

  const department =
    user.department || "Department";

  const departmentCameras = [
    {
      id: "CAM-GJ-001",
      name: "Ahmedabad Central Junction",
      status: "Online",
      uptime: "99.8%",
      heartbeat: "2 mins ago",
    },
    {
      id: "CAM-GJ-002",
      name: "SG Highway Surveillance",
      status: "Online",
      uptime: "99.6%",
      heartbeat: "1 min ago",
    },
  ];

  const onlineCameras = departmentCameras.filter(
    (camera) => camera.status === "Online"
  ).length;

  const offlineCameras =
    departmentCameras.length - onlineCameras;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <div className="flex items-center gap-2">

            <ShieldCheck className="w-6 h-6 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Department Admin Dashboard
            </h1>

          </div>

          <p className="text-sm text-slate-500 mt-1">
            {department} — CCTV infrastructure management
          </p>

        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">

          <ShieldCheck className="w-4 h-4 text-blue-600" />

          <span className="text-xs font-medium text-blue-700">
            Department Access
          </span>

        </div>

      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Cameras */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Camera className="w-5 h-5 text-blue-600" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Department Cameras
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            {departmentCameras.length}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Registered cameras
          </p>

        </div>

        {/* Online */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Online
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            {onlineCameras}
          </p>

          <p className="text-xs text-emerald-600 mt-1">
            Currently reachable
          </p>

        </div>

        {/* Offline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Offline
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            {offlineCameras}
          </p>

          <p className="text-xs text-red-600 mt-1">
            Requires attention
          </p>

        </div>

        {/* VMS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
            <Server className="w-5 h-5 text-violet-600" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            VMS Systems
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            1
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Department VMS
          </p>

        </div>

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Camera Health */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl">

          <div className="p-5 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Camera Health
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Cameras assigned to your department
              </p>
            </div>

            <Activity className="w-5 h-5 text-slate-400" />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px]">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                    Camera
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Status
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Uptime
                  </th>

                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">
                    Last Heartbeat
                  </th>

                </tr>

              </thead>

              <tbody>

                {departmentCameras.map((camera) => (

                  <tr
                    key={camera.id}
                    className="border-b border-slate-100 last:border-0"
                  >

                    <td className="px-5 py-4">

                      <p className="text-sm font-medium text-slate-800">
                        {camera.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {camera.id}
                      </p>

                    </td>

                    <td className="px-4 py-4 text-center">

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">

                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                        {camera.status}

                      </span>

                    </td>

                    <td className="px-4 py-4 text-center text-sm text-slate-700">
                      {camera.uptime}
                    </td>

                    <td className="px-4 py-4 text-center text-sm text-slate-500">
                      {camera.heartbeat}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Department Modules */}
        <div className="bg-white border border-slate-200 rounded-xl">

          <div className="p-5 border-b border-slate-200">

            <h2 className="font-semibold text-slate-900">
              Department Modules
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Available department operations
            </p>

          </div>

          <div className="p-4 space-y-2">

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">

              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Camera className="w-4 h-4 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  Camera Registry
                </p>

                <p className="text-xs text-slate-500">
                  Manage department cameras
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
                  View department cameras
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">

              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <Server className="w-4 h-4 text-violet-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  VMS System
                </p>

                <p className="text-xs text-slate-500">
                  Department VMS details
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
                  Monitor camera availability
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-xl">

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center gap-2">

            <Clock className="w-5 h-5 text-slate-400" />

            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Activity
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Recent department infrastructure events
              </p>
            </div>

          </div>

        </div>

        <div className="p-5">

          <div className="flex items-start gap-3">

            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">

              <CheckCircle2 className="w-4 h-4 text-emerald-600" />

            </div>

            <div>

              <p className="text-sm font-medium text-slate-800">
                Camera heartbeat received
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Department camera infrastructure is responding normally.
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                2 minutes ago
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DepartmentAdminDashboard;