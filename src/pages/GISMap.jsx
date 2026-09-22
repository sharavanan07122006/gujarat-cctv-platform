import { useMemo, useState } from "react";
import {
  MapPin,
  Search,
  X,
  Activity,
  Building2,
  Video,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* -------------------------------------------------------
   Demo CCTV Data
------------------------------------------------------- */

const cameras = [
  {
    id: "CAM-GJ-001",
    name: "Ahmedabad Central Junction",
    department: "Police Department",
    district: "Ahmedabad",
    latitude: 23.0225,
    longitude: 72.5714,
    type: "PTZ",
    status: "Online",
    lastHeartbeat: "2 mins ago",

    // GIS Coverage Configuration
    coverageRangeMeters: 150,
    direction: 90,
    fieldOfView: 70,
  },
  {
    id: "CAM-GJ-002",
    name: "SG Highway Surveillance",
    department: "Police Department",
    district: "Ahmedabad",
    latitude: 23.0395,
    longitude: 72.5112,
    type: "Fixed",
    status: "Online",
    lastHeartbeat: "1 min ago",

    coverageRangeMeters: 120,
    direction: 180,
    fieldOfView: 60,
  },
  {
    id: "CAM-GJ-003",
    name: "Vadodara Railway Road",
    department: "Transport Department",
    district: "Vadodara",
    latitude: 22.3072,
    longitude: 73.1812,
    type: "PTZ",
    status: "Offline",
    lastHeartbeat: "18 mins ago",

    coverageRangeMeters: 200,
    direction: 270,
    fieldOfView: 90,
  },
  {
    id: "CAM-GJ-004",
    name: "Gandhinagar Sector 21",
    department: "Smart City Mission",
    district: "Gandhinagar",
    latitude: 23.2156,
    longitude: 72.6369,
    type: "Fixed",
    status: "Online",
    lastHeartbeat: "3 mins ago",

    coverageRangeMeters: 100,
    direction: 45,
    fieldOfView: 60,
  },
  {
    id: "CAM-GJ-005",
    name: "Surat Ring Road",
    department: "Municipal Corporation",
    district: "Surat",
    latitude: 21.1702,
    longitude: 72.8311,
    type: "ANPR",
    status: "Online",
    lastHeartbeat: "1 min ago",

    coverageRangeMeters: 180,
    direction: 135,
    fieldOfView: 50,
  },
  {
    id: "CAM-GJ-006",
    name: "Rajkot City Centre",
    department: "Police Department",
    district: "Rajkot",
    latitude: 22.3039,
    longitude: 70.8022,
    type: "Fixed",
    status: "Offline",
    lastHeartbeat: "25 mins ago",

    coverageRangeMeters: 110,
    direction: 225,
    fieldOfView: 65,
  },
];

/* -------------------------------------------------------
   Custom Marker Icons
------------------------------------------------------- */

const onlineIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const offlineIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/* -------------------------------------------------------
   Map Controller
------------------------------------------------------- */

function MapController({ selectedCamera }) {
  const map = useMap();

  if (selectedCamera) {
    map.flyTo(
      [
        selectedCamera.latitude,
        selectedCamera.longitude,
      ],
      15,
      {
        duration: 1,
      }
    );
  }

  return null;
}

/* -------------------------------------------------------
   GIS Map Component
------------------------------------------------------- */

function GISMap() {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedCamera, setSelectedCamera] =
    useState(null);

  /* -------------------------------------------------------
     Filter Cameras
  ------------------------------------------------------- */

  const filteredCameras = useMemo(() => {
    return cameras.filter((camera) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        camera.id.toLowerCase().includes(searchText) ||
        camera.name.toLowerCase().includes(searchText) ||
        camera.district.toLowerCase().includes(searchText) ||
        camera.department.toLowerCase().includes(searchText);

      const matchesDepartment =
        departmentFilter === "All" ||
        camera.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        camera.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    search,
    departmentFilter,
    statusFilter,
  ]);

  /* -------------------------------------------------------
     Summary
  ------------------------------------------------------- */

  const onlineCount = cameras.filter(
    (camera) => camera.status === "Online"
  ).length;

  const offlineCount = cameras.filter(
    (camera) => camera.status === "Offline"
  ).length;

  const departments = [
    ...new Set(
      cameras.map((camera) => camera.department)
    ),
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          GIS Camera Map
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Geospatial view of registered CCTV infrastructure
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Mapped Cameras */}

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Mapped Cameras
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {cameras.length}
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
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
                {onlineCount}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-600" />
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
                {offlineCount}
              </p>
            </div>

            <div className="p-3 bg-red-50 rounded-lg">
              <Video className="w-5 h-5 text-red-600" />
            </div>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white border border-slate-200 rounded-xl p-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}

          <div className="relative">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search camera, district..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Department */}

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500"
          >

            <option value="All">
              All Departments
            </option>

            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
              </option>
            ))}

          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500"
          >

            <option value="All">
              All Status
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>

          </select>

        </div>

      </div>

      {/* Map + Camera List */}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">

        {/* Map */}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="h-[500px] sm:h-[600px]">

            <MapContainer
              center={[22.5, 72.5]}
              zoom={7}
              scrollWheelZoom={true}
              className="h-full w-full"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController
                selectedCamera={selectedCamera}
              />

              {filteredCameras.map((camera) => (

                <div key={camera.id}>

                  {/* Coverage Radius */}

                  <Circle
                    center={[
                      camera.latitude,
                      camera.longitude,
                    ]}
                    radius={
                      camera.coverageRangeMeters
                    }
                    pathOptions={{
                      color:
                        camera.status === "Online"
                          ? "#16a34a"
                          : "#dc2626",

                      fillColor:
                        camera.status === "Online"
                          ? "#16a34a"
                          : "#dc2626",

                      fillOpacity: 0.08,
                      weight: 1.5,
                    }}
                  />

                  {/* Camera Marker */}

                  <Marker
                    position={[
                      camera.latitude,
                      camera.longitude,
                    ]}
                    icon={
                      camera.status === "Online"
                        ? onlineIcon
                        : offlineIcon
                    }
                    eventHandlers={{
                      click: () =>
                        setSelectedCamera(camera),
                    }}
                  >

                    <Popup>

                      <div className="min-w-[220px]">

                        <p className="font-semibold text-slate-900">
                          {camera.name}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {camera.id}
                        </p>

                        <div className="mt-3 space-y-1.5 text-sm">

                          <p>
                            <strong>District:</strong>{" "}
                            {camera.district}
                          </p>

                          <p>
                            <strong>Type:</strong>{" "}
                            {camera.type}
                          </p>

                          <p>
                            <strong>Status:</strong>{" "}

                            <span
                              className={
                                camera.status === "Online"
                                  ? "text-emerald-600 font-medium"
                                  : "text-red-600 font-medium"
                              }
                            >
                              {camera.status}
                            </span>

                          </p>

                          <p>
                            <strong>Coverage:</strong>{" "}
                            {camera.coverageRangeMeters} m
                          </p>

                          <p>
                            <strong>Direction:</strong>{" "}
                            {camera.direction}°
                          </p>

                          <p>
                            <strong>FOV:</strong>{" "}
                            {camera.fieldOfView}°
                          </p>

                        </div>

                      </div>

                    </Popup>

                  </Marker>

                </div>

              ))}

            </MapContainer>

          </div>

        </div>

        {/* Camera List */}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="p-4 border-b border-slate-200">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold text-slate-900">
                  Camera Locations
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {filteredCameras.length} cameras shown
                </p>

              </div>

              <MapPin className="w-5 h-5 text-slate-400" />

            </div>

          </div>

          <div className="max-h-[540px] overflow-y-auto">

            {filteredCameras.length === 0 ? (

              <div className="p-8 text-center">

                <MapPin className="w-8 h-8 text-slate-300 mx-auto" />

                <p className="text-sm text-slate-500 mt-2">
                  No cameras found
                </p>

              </div>

            ) : (

              filteredCameras.map((camera) => (

                <button
                  key={camera.id}
                  onClick={() =>
                    setSelectedCamera(camera)
                  }
                  className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition ${
                    selectedCamera?.id === camera.id
                      ? "bg-blue-50"
                      : ""
                  }`}
                >

                  <div className="flex items-start gap-3">

                    <div
                      className={`mt-1 w-2.5 h-2.5 rounded-full ${
                        camera.status === "Online"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />

                    <div className="min-w-0 flex-1">

                      <p className="font-medium text-sm text-slate-900 truncate">
                        {camera.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {camera.id}
                      </p>

                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">

                        <Building2 className="w-3.5 h-3.5" />

                        <span className="truncate">
                          {camera.department}
                        </span>

                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        {camera.district} · {camera.type}
                      </p>

                      {/* Coverage Info */}

                      <div className="flex flex-wrap gap-2 mt-2">

                        <span className="px-2 py-1 rounded-md bg-slate-100 text-[11px] text-slate-600">
                          {camera.coverageRangeMeters} m range
                        </span>

                        <span className="px-2 py-1 rounded-md bg-slate-100 text-[11px] text-slate-600">
                          {camera.direction}° direction
                        </span>

                        <span className="px-2 py-1 rounded-md bg-slate-100 text-[11px] text-slate-600">
                          {camera.fieldOfView}° FOV
                        </span>

                      </div>

                    </div>

                  </div>

                </button>

              ))

            )}

          </div>

        </div>

      </div>

      {/* Selected Camera */}

      {selectedCamera && (

        <div className="bg-white border border-blue-200 rounded-xl p-5">

          <div className="flex items-start justify-between gap-4">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="font-semibold text-slate-900">
                  {selectedCamera.name}
                </h2>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCamera.status === "Online"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {selectedCamera.status}
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-1">
                {selectedCamera.id}
              </p>

            </div>

            <button
              onClick={() =>
                setSelectedCamera(null)
              }
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>

          </div>

          {/* Camera Information */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

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
                Camera Type
              </p>

              <p className="text-sm font-medium text-slate-900 mt-1">
                {selectedCamera.type}
              </p>

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Last Heartbeat
              </p>

              <p className="text-sm font-medium text-slate-900 mt-1">
                {selectedCamera.lastHeartbeat}
              </p>

            </div>

          </div>

          {/* Coverage Configuration */}

          <div className="mt-5 pt-5 border-t border-slate-100">

            <h3 className="text-sm font-semibold text-slate-800">
              Camera Coverage Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

              <div className="bg-slate-50 rounded-lg p-4">

                <p className="text-xs text-slate-500">
                  Coverage Range
                </p>

                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {selectedCamera.coverageRangeMeters} m
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Approximate detection radius
                </p>

              </div>

              <div className="bg-slate-50 rounded-lg p-4">

                <p className="text-xs text-slate-500">
                  Camera Direction
                </p>

                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {selectedCamera.direction}°
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Orientation from north
                </p>

              </div>

              <div className="bg-slate-50 rounded-lg p-4">

                <p className="text-xs text-slate-500">
                  Field of View
                </p>

                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {selectedCamera.fieldOfView}°
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Horizontal viewing angle
                </p>

              </div>

            </div>

          </div>

          {/* GIS Coordinates */}

          <div className="mt-5 pt-4 border-t border-slate-100">

            <p className="text-xs text-slate-500">
              GIS Coordinates
            </p>

            <p className="text-sm font-mono text-slate-700 mt-1">
              {selectedCamera.latitude},{" "}
              {selectedCamera.longitude}
            </p>

          </div>
          {/* Demo Notice */}

          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">

            <p className="text-xs text-blue-700 leading-relaxed">
              Coverage values shown are demonstration
              configuration data. Actual CCTV coverage depends
              on camera lens, mounting height, focal length,
              orientation, PTZ position, and environmental
              conditions.
            </p>

          </div>

        </div>

      )}
    </div>
  );
}

export default GISMap;