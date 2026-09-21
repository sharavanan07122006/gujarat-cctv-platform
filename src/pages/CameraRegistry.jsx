import {
  Camera,
  Plus,
  Search,
  Filter,
  MapPin,
  Eye,
  Pencil,
  X,
} from "lucide-react";

import { useState } from "react";

const initialCameras = [
  {
    id: "CAM-GJ-000124",
    name: "Ahmedabad Junction Camera 01",
    department: "Police",
    district: "Ahmedabad",
    type: "IP Camera",
    manufacturer: "Hikvision",
    latitude: "23.0225",
    longitude: "72.5714",
    vms: "Police VMS",
    status: "Online",
    lastHeartbeat: "12 sec ago",
  },
  {
    id: "CAM-GJ-000287",
    name: "Surat Ring Road Camera 03",
    department: "Municipal Corporation",
    district: "Surat",
    type: "PTZ Camera",
    manufacturer: "Dahua",
    latitude: "21.1702",
    longitude: "72.8311",
    vms: "Municipal VMS",
    status: "Online",
    lastHeartbeat: "18 sec ago",
  },
  {
    id: "CAM-GJ-000451",
    name: "Vadodara Railway Road Camera 02",
    department: "Transport",
    district: "Vadodara",
    type: "IP Camera",
    manufacturer: "Bosch",
    latitude: "22.3072",
    longitude: "73.1812",
    vms: "Transport VMS",
    status: "Offline",
    lastHeartbeat: "18 min ago",
  },
  {
    id: "CAM-GJ-000512",
    name: "Rajkot Central Road Camera 05",
    department: "Police",
    district: "Rajkot",
    type: "PTZ Camera",
    manufacturer: "Axis",
    latitude: "22.3039",
    longitude: "70.8022",
    vms: "Police VMS",
    status: "Online",
    lastHeartbeat: "8 sec ago",
  },
  {
    id: "CAM-GJ-000638",
    name: "Gandhinagar Sector 10 Camera 01",
    department: "Smart City",
    district: "Gandhinagar",
    type: "IP Camera",
    manufacturer: "Hikvision",
    latitude: "23.2156",
    longitude: "72.6369",
    vms: "Smart City VMS",
    status: "Online",
    lastHeartbeat: "21 sec ago",
  },
  {
    id: "CAM-GJ-000721",
    name: "Bhavnagar Main Road Camera 04",
    department: "Municipal Corporation",
    district: "Bhavnagar",
    type: "IP Camera",
    manufacturer: "Dahua",
    latitude: "21.7645",
    longitude: "72.1519",
    vms: "Municipal VMS",
    status: "Offline",
    lastHeartbeat: "32 min ago",
  },
];

const emptyForm = {
  id: "",
  name: "",
  department: "",
  district: "",
  type: "IP Camera",
  manufacturer: "",
  latitude: "",
  longitude: "",
  vms: "",
  status: "Online",
};

function CameraRegistry() {
  const [cameras, setCameras] = useState(initialCameras);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingCamera, setEditingCamera] = useState(null);

  const [selectedCamera, setSelectedCamera] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [formError, setFormError] = useState("");

  const filteredCameras = cameras.filter((camera) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      camera.id.toLowerCase().includes(searchValue) ||
      camera.name.toLowerCase().includes(searchValue) ||
      camera.department.toLowerCase().includes(searchValue) ||
      camera.district.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || camera.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const openRegisterForm = () => {
    setEditingCamera(null);
    setFormData(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (camera) => {
    setEditingCamera(camera);
    setFormData({
      id: camera.id,
      name: camera.name,
      department: camera.department,
      district: camera.district,
      type: camera.type,
      manufacturer: camera.manufacturer,
      latitude: camera.latitude,
      longitude: camera.longitude,
      vms: camera.vms,
      status: camera.status,
    });

    setFormError("");
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedId = formData.id.trim();

    const duplicateCamera = cameras.some(
      (camera) =>
        camera.id.toLowerCase() === trimmedId.toLowerCase() &&
        camera.id !== editingCamera?.id
    );

    if (duplicateCamera) {
      setFormError(
        "This Camera ID already exists. Please use a unique Camera ID."
      );
      return;
    }

    const updatedCamera = {
      ...formData,
      id: trimmedId,
      name: formData.name.trim(),
      department: formData.department.trim(),
      district: formData.district.trim(),
      manufacturer: formData.manufacturer.trim(),
      latitude: formData.latitude.trim(),
      longitude: formData.longitude.trim(),
      vms: formData.vms.trim(),
      lastHeartbeat: editingCamera
        ? editingCamera.lastHeartbeat
        : "Just now",
    };

    if (editingCamera) {
      setCameras((previous) =>
        previous.map((camera) =>
          camera.id === editingCamera.id
            ? updatedCamera
            : camera
        )
      );
    } else {
      setCameras((previous) => [
        updatedCamera,
        ...previous,
      ]);
    }

    setFormData(emptyForm);
    setEditingCamera(null);
    setFormError("");
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCamera(null);
    setFormData(emptyForm);
    setFormError("");
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">

            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Camera
                className="text-blue-600"
                size={22}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                CCTV Registry
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Central registry of connected CCTV cameras
              </p>
            </div>

          </div>
        </div>

        <button
          onClick={openRegisterForm}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={18} />
          Register Camera
        </button>

      </div>


      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <SummaryCard
          label="Total Cameras"
          value={cameras.length}
        />

        <SummaryCard
          label="Online"
          value={
            cameras.filter(
              (camera) => camera.status === "Online"
            ).length
          }
          valueClass="text-green-600"
        />

        <SummaryCard
          label="Offline"
          value={
            cameras.filter(
              (camera) => camera.status === "Offline"
            ).length
          }
          valueClass="text-red-600"
        />

      </div>


      {/* Search and Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by camera ID, name, department or district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />

          </div>

          <div className="flex items-center gap-2">

            <Filter
              size={18}
              className="text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none"
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

      </div>


      {/* Registry Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="px-5 py-4 border-b border-slate-200">

          <h2 className="font-semibold text-slate-900">
            Registered Cameras
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            {filteredCameras.length} camera(s) displayed
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px] text-sm">

            <thead className="bg-slate-50">

              <tr className="text-left text-slate-500">

                <th className="px-5 py-3 font-medium">
                  Camera
                </th>

                <th className="px-5 py-3 font-medium">
                  Department
                </th>

                <th className="px-5 py-3 font-medium">
                  District
                </th>

                <th className="px-5 py-3 font-medium">
                  Type
                </th>

                <th className="px-5 py-3 font-medium">
                  Manufacturer
                </th>

                <th className="px-5 py-3 font-medium">
                  Status
                </th>

                <th className="px-5 py-3 font-medium">
                  Last Heartbeat
                </th>

                <th className="px-5 py-3 font-medium">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCameras.length > 0 ? (

                filteredCameras.map((camera) => (
                  <CameraRow
                    key={camera.id}
                    camera={camera}
                    onView={() => setSelectedCamera(camera)}
                    onEdit={() => openEditForm(camera)}
                  />
                ))

              ) : (

                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12 text-slate-500"
                  >
                    No cameras found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Camera Form */}
      {showForm && (
        <CameraForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={closeForm}
          editing={Boolean(editingCamera)}
          formError={formError}
        />
      )}


      {/* Camera View Modal */}
      {selectedCamera && (
        <CameraDetails
          camera={selectedCamera}
          onClose={() => setSelectedCamera(null)}
          onEdit={() => {
            setSelectedCamera(null);
            openEditForm(selectedCamera);
          }}
        />
      )}

    </div>
  );
}


function CameraForm({
  formData,
  handleChange,
  handleSubmit,
  onClose,
  editing,
  formError,
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {editing
                ? "Edit CCTV Camera"
                : "Register CCTV Camera"}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {editing
                ? "Update camera metadata in the central registry"
                : "Add camera metadata to the central registry"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {formError}
            </div>
          )}


          {/* Camera Identity */}
          <section>

            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Camera Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <FormField
                label="Camera ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="CAM-GJ-000800"
                required
              />

              <FormField
                label="Camera Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ahmedabad Ring Road Camera 01"
                required
              />

            </div>

          </section>


          {/* Organisation */}
          <section>

            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Organisation & Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <SelectField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={[
                  "Police",
                  "Transport",
                  "Municipal Corporation",
                  "Smart City",
                  "Other",
                ]}
                required
              />

              <FormField
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Ahmedabad"
                required
              />

            </div>

          </section>


          {/* Technical Information */}
          <section>

            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Technical Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <SelectField
                label="Camera Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                  "IP Camera",
                  "PTZ Camera",
                  "Dome Camera",
                  "Bullet Camera",
                  "Analog Camera",
                ]}
                required
              />

              <FormField
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="Hikvision"
                required
              />

              <FormField
                label="VMS System"
                name="vms"
                value={formData.vms}
                onChange={handleChange}
                placeholder="Police VMS"
              />

              <SelectField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  "Online",
                  "Offline",
                ]}
                required
              />

            </div>

          </section>


          {/* GIS Information */}
          <section>

            <div className="flex items-center gap-2 mb-4">

              <MapPin
                size={17}
                className="text-blue-600"
              />

              <h3 className="text-sm font-semibold text-slate-800">
                GIS Coordinates
              </h3>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <FormField
                label="Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="23.0225"
                required
              />

              <FormField
                label="Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="72.5714"
                required
              />

            </div>

            <p className="text-xs text-slate-400 mt-3">
              Coordinates will be used for GIS-based camera mapping
              and spatial queries.
            </p>

          </section>


          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-200">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
            >
              {editing
                ? "Update Camera"
                : "Register Camera"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


function CameraDetails({
  camera,
  onClose,
  onEdit,
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Camera
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Camera Details
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {camera.id}
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>


        {/* Details */}
        <div className="p-6 space-y-6">

          <div>
            <p className="text-xs text-slate-500">
              Camera Name
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {camera.name}
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <DetailItem
              label="Camera ID"
              value={camera.id}
            />

            <DetailItem
              label="Department"
              value={camera.department}
            />

            <DetailItem
              label="District"
              value={camera.district}
            />

            <DetailItem
              label="Camera Type"
              value={camera.type}
            />

            <DetailItem
              label="Manufacturer"
              value={camera.manufacturer}
            />

            <DetailItem
              label="VMS System"
              value={camera.vms || "Not specified"}
            />

            <DetailItem
              label="Latitude"
              value={camera.latitude}
            />

            <DetailItem
              label="Longitude"
              value={camera.longitude}
            />

            <div>
              <p className="text-xs text-slate-500">
                Status
              </p>

              <span
                className={`
                  inline-flex items-center gap-1.5
                  px-2.5 py-1
                  rounded-full
                  text-xs
                  font-medium
                  mt-1.5
                  ${
                    camera.status === "Online"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }
                `}
              >
                <span
                  className={`
                    w-1.5 h-1.5 rounded-full
                    ${
                      camera.status === "Online"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  `}
                />

                {camera.status}
              </span>
            </div>

            <DetailItem
              label="Last Heartbeat"
              value={camera.lastHeartbeat}
            />

          </div>


          {/* GIS */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">

            <div className="flex items-center gap-2 mb-2">

              <MapPin
                size={17}
                className="text-blue-600"
              />

              <p className="text-sm font-semibold text-slate-800">
                GIS Location
              </p>

            </div>

            <p className="text-sm text-slate-600">
              Latitude: {camera.latitude}
            </p>

            <p className="text-sm text-slate-600 mt-1">
              Longitude: {camera.longitude}
            </p>

          </div>


          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-200">

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>

            <button
              onClick={onEdit}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
            >
              <Pencil size={16} />
              Edit Camera
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


function DetailItem({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-sm font-medium text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );
}


function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
      />
    </div>
  );
}


function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


function SummaryCard({
  label,
  value,
  valueClass = "text-slate-900",
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className={`text-2xl font-bold mt-2 ${valueClass}`}>
        {value}
      </p>

    </div>
  );
}


function CameraRow({
  camera,
  onView,
  onEdit,
}) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition">

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Camera
              size={18}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="font-medium text-slate-800">
              {camera.name}
            </p>

            <p className="text-xs text-slate-400 mt-0.5">
              {camera.id}
            </p>
          </div>

        </div>

      </td>


      <td className="px-5 py-4 text-slate-600">
        {camera.department}
      </td>


      <td className="px-5 py-4">

        <div className="flex items-center gap-1.5 text-slate-600">
          <MapPin size={15} />
          {camera.district}
        </div>

      </td>


      <td className="px-5 py-4 text-slate-600">
        {camera.type}
      </td>


      <td className="px-5 py-4 text-slate-600">
        {camera.manufacturer}
      </td>


      <td className="px-5 py-4">

        <span
          className={`
            inline-flex items-center gap-1.5
            px-2.5 py-1
            rounded-full
            text-xs
            font-medium
            ${
              camera.status === "Online"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }
          `}
        >
          <span
            className={`
              w-1.5 h-1.5 rounded-full
              ${
                camera.status === "Online"
                  ? "bg-green-500"
                  : "bg-red-500"
              }
            `}
          />

          {camera.status}
        </span>

      </td>


      <td className="px-5 py-4 text-slate-500">
        {camera.lastHeartbeat}
      </td>


      <td className="px-5 py-4">

        <div className="flex items-center gap-1">

          <button
            title="View Camera"
            onClick={onView}
            className="p-2 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Eye size={17} />
          </button>

          <button
            title="Edit Camera"
            onClick={onEdit}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <Pencil size={17} />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default CameraRegistry;