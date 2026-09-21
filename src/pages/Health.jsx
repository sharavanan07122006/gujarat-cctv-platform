import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Search,
  Server,
  X,
} from "lucide-react";

const initialHealthData = [
  {
    id: "CAM-GJ-001",
    name: "Ahmedabad Central Junction",
    department: "Police Department",
    district: "Ahmedabad",
    status: "Online",
    uptime: "99.8%",
    lastHeartbeat: "2 mins ago",
    responseTime: "42 ms",
  },
  {
    id: "CAM-GJ-002",
    name: "SG Highway Surveillance",
    department: "Police Department",
    district: "Ahmedabad",
    status: "Online",
    uptime: "99.6%",
    lastHeartbeat: "1 min ago",
    responseTime: "38 ms",
  },
  {
    id: "CAM-GJ-003",
    name: "Vadodara Railway Road",
    department: "Transport Department",
    district: "Vadodara",
    status: "Offline",
    uptime: "94.2%",
    lastHeartbeat: "18 mins ago",
    responseTime: "Timeout",
  },
  {
    id: "CAM-GJ-004",
    name: "Gandhinagar Sector 21",
    department: "Smart City Mission",
    district: "Gandhinagar",
    status: "Online",
    uptime: "99.9%",
    lastHeartbeat: "3 mins ago",
    responseTime: "35 ms",
  },
  {
    id: "CAM-GJ-005",
    name: "Surat Ring Road",
    department: "Municipal Corporation",
    district: "Surat",
    status: "Warning",
    uptime: "97.4%",
    lastHeartbeat: "6 mins ago",
    responseTime: "185 ms",
  },
  {
    id: "CAM-GJ-006",
    name: "Rajkot City Centre",
    department: "Police Department",
    district: "Rajkot",
    status: "Offline",
    uptime: "92.8%",
    lastHeartbeat: "25 mins ago",
    responseTime: "Timeout",
  },
];

function Health() {
  const [healthData, setHealthData] = useState(initialHealthData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCamera, setSelectedCamera] = useState(null);

  const summary = {
    total: healthData.length,
    online: healthData.filter(
      (camera) => camera.status === "Online"
    ).length,
    warning: healthData.filter(
      (camera) => camera.status === "Warning"
    ).length,
    offline: healthData.filter(
      (camera) => camera.status === "Offline"
    ).length,
  };

  const filteredCameras = useMemo(() => {
    return healthData.filter((camera) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        camera.id.toLowerCase().includes(searchText) ||
        camera.name.toLowerCase().includes(searchText) ||
        camera.department.toLowerCase().includes(searchText) ||
        camera.district.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        camera.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [healthData, search, statusFilter]);

  const simulateRefresh = () => {
    setHealthData((currentData) =>
      currentData.map((camera) => ({
        ...camera,
        lastHeartbeat:
          camera.status === "Offline"
            ? camera.lastHeartbeat
            : "Just now",
      }))
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Online") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "Warning") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }

    return "bg-red-50 text-red-700 border-red-200";
  };

  const getStatusIcon = (status) => {
    if (status === "Online") {
      return <CheckCircle2 className="w-4 h-4" />;
    }

    if (status === "Warning") {
      return <AlertTriangle className="w-4 h-4" />;
    }

    return <Server className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            CCTV Health
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor camera connectivity, heartbeat and system health
          </p>
        </div>

        <button
          onClick={simulateRefresh}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          <Activity className="w-4 h-4" />
          Refresh Health
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total */}

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Cameras
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {summary.total}
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <Server className="w-5 h-5 text-blue-600" />
            </div>

          </div>

        </div>

        {/* Online */}

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Online
              </p>

              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {summary.online}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

          </div>

        </div>

        {/* Warning */}

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Warning
              </p>

              <p className="text-2xl font-bold text-amber-600 mt-1">
                {summary.warning}
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>

          </div>

        </div>

        {/* Offline */}

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Offline
              </p>

              <p className="text-2xl font-bold text-red-600 mt-1">
                {summary.offline}
              </p>
            </div>

            <div className="p-3 bg-red-50 rounded-lg">
              <Server className="w-5 h-5 text-red-600" />
            </div>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white border border-slate-200 rounded-xl p-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search camera, district or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Online">Online</option>
            <option value="Warning">Warning</option>
            <option value="Offline">Offline</option>
          </select>

        </div>

      </div>

      {/* Health Table */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Camera Health Status
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {filteredCameras.length} cameras shown
              </p>
            </div>

            <Activity className="w-5 h-5 text-slate-400" />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Camera
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Department
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Uptime
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Last Heartbeat
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Response
                </th>

                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredCameras.map((camera) => (

                <tr
                  key={camera.id}
                  className="hover:bg-slate-50 transition"
                >

                  {/* Camera */}

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-slate-900">
                      {camera.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {camera.id}
                    </p>

                  </td>

                  {/* Department */}

                  <td className="px-5 py-4">

                    <p className="text-sm text-slate-700">
                      {camera.department}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {camera.district}
                    </p>

                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusStyle(
                        camera.status
                      )}`}
                    >
                      {getStatusIcon(camera.status)}
                      {camera.status}
                    </span>

                  </td>

                  {/* Uptime */}

                  <td className="px-5 py-4">

                    <span className="text-sm font-medium text-slate-700">
                      {camera.uptime}
                    </span>

                  </td>

                  {/* Heartbeat */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <Clock3 className="w-4 h-4 text-slate-400" />

                      <span className="text-sm text-slate-600">
                        {camera.lastHeartbeat}
                      </span>

                    </div>

                  </td>

                  {/* Response */}

                  <td className="px-5 py-4">

                    <span
                      className={
                        camera.responseTime === "Timeout"
                          ? "text-sm text-red-600 font-medium"
                          : camera.responseTime === "185 ms"
                          ? "text-sm text-amber-600 font-medium"
                          : "text-sm text-emerald-600 font-medium"
                      }
                    >
                      {camera.responseTime}
                    </span>

                  </td>

                  {/* Action */}

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() => setSelectedCamera(camera)}
                      className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredCameras.length === 0 && (
          <div className="p-10 text-center">

            <Activity className="w-8 h-8 text-slate-300 mx-auto" />

            <p className="text-sm text-slate-500 mt-2">
              No camera health records found.
            </p>

          </div>
        )}

      </div>

      {/* Camera Details Modal */}

      {selectedCamera && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setSelectedCamera(null)}
          />

          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">

            {/* Modal Header */}

            <div className="p-5 border-b border-slate-200 flex items-start justify-between">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Camera Health Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedCamera.id}
                </p>

              </div>

              <button
                onClick={() => setSelectedCamera(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

            </div>

            {/* Modal Content */}

            <div className="p-5 space-y-5">

              <div>

                <p className="text-xs text-slate-500">
                  Camera Name
                </p>

                <p className="text-sm font-medium text-slate-900 mt-1">
                  {selectedCamera.name}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <p className="text-xs text-slate-500">
                    Department
                  </p>

                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {selectedCamera.department}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    District
                  </p>

                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {selectedCamera.district}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusStyle(
                      selectedCamera.status
                    )}`}
                  >
                    {getStatusIcon(selectedCamera.status)}
                    {selectedCamera.status}
                  </span>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Uptime
                  </p>

                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {selectedCamera.uptime}
                  </p>

                </div>

              </div>

              <div className="border-t border-slate-100 pt-4">

                <p className="text-xs text-slate-500">
                  Last Heartbeat
                </p>

                <p className="text-sm font-medium text-slate-900 mt-1">
                  {selectedCamera.lastHeartbeat}
                </p>

              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Network Response
                </p>

                <p className="text-sm font-medium text-slate-900 mt-1">
                  {selectedCamera.responseTime}
                </p>

              </div>

            </div>

            <div className="px-5 py-4 border-t border-slate-200 flex justify-end">

              <button
                onClick={() => setSelectedCamera(null)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Health;