import {
  Camera,
  CheckCircle2,
  XCircle,
  Building2,
} from "lucide-react";

import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Overview of the centralised CCTV registry
        </p>
      </div>


      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Registered Cameras"
          value="12,480"
          description="Cameras in central registry"
          icon={<Camera size={22} className="text-blue-600" />}
          iconBg="bg-blue-50"
        />

        <StatCard
          title="Online Cameras"
          value="11,932"
          description="Currently reporting heartbeat"
          icon={<CheckCircle2 size={22} className="text-green-600" />}
          iconBg="bg-green-50"
        />

        <StatCard
          title="Offline Cameras"
          value="548"
          description="Require health attention"
          icon={<XCircle size={22} className="text-red-600" />}
          iconBg="bg-red-50"
        />

        <StatCard
          title="Departments"
          value="26"
          description="Integrated departments"
          icon={<Building2 size={22} className="text-purple-600" />}
          iconBg="bg-purple-50"
        />

      </div>


      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* GIS Preview */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl">

          <div className="p-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">
              GIS Camera Distribution
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Geographic distribution of registered CCTV cameras
            </p>
          </div>

          <div className="h-80 bg-slate-100 flex items-center justify-center">

            <div className="text-center">
              <Camera
                size={42}
                className="mx-auto text-slate-400"
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                GIS Map Integration
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Interactive map will be connected here
              </p>
            </div>

          </div>

        </div>


        {/* System status */}
        <div className="bg-white border border-slate-200 rounded-xl">

          <div className="p-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">
              System Status
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Platform infrastructure
            </p>
          </div>

          <div className="p-5 space-y-5">

            <StatusItem
              name="CCTV Registry"
              status="Operational"
            />

            <StatusItem
              name="GIS Services"
              status="Operational"
            />

            <StatusItem
              name="Database"
              status="Operational"
            />

            <StatusItem
              name="VMS Integration"
              status="Operational"
            />

          </div>

        </div>

      </div>


      {/* Recent registry activity */}
      <div className="bg-white border border-slate-200 rounded-xl">

        <div className="p-5 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">
            Recent Registry Activity
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest camera registry updates
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500">

              <tr>
                <th className="text-left px-5 py-3 font-medium">
                  Camera ID
                </th>

                <th className="text-left px-5 py-3 font-medium">
                  Location
                </th>

                <th className="text-left px-5 py-3 font-medium">
                  Department
                </th>

                <th className="text-left px-5 py-3 font-medium">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              <ActivityRow
                id="CAM-GJ-000124"
                location="Ahmedabad"
                department="Police"
                status="Online"
              />

              <ActivityRow
                id="CAM-GJ-000287"
                location="Surat"
                department="Municipal Corporation"
                status="Online"
              />

              <ActivityRow
                id="CAM-GJ-000451"
                location="Vadodara"
                department="Transport"
                status="Offline"
              />

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}


function StatusItem({ name, status }) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>

        <span className="text-sm text-slate-700">
          {name}
        </span>

      </div>

      <span className="text-xs font-medium text-green-600">
        {status}
      </span>

    </div>
  );
}


function ActivityRow({ id, location, department, status }) {
  return (
    <tr className="border-t border-slate-100">

      <td className="px-5 py-4 font-medium text-slate-700">
        {id}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {location}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {department}
      </td>

      <td className="px-5 py-4">

        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            status === "Online"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status}
        </span>

      </td>

    </tr>
  );
}

export default Dashboard;