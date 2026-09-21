import { useMemo, useState } from "react";
import {
  Server,
  Plus,
  Search,
  Eye,
  Pencil,
  X,
  Building2,
  Video,
  Activity,
} from "lucide-react";

const initialVMS = [
  {
    id: "vms-001",
    name: "Central VMS",
    vendor: "Milestone",
    version: "2024 R3",
    department: "Police Department",
    endpoint: "vms-police-demo.local",
    cameras: 2,
    status: "Active",
  },
  {
    id: "vms-002",
    name: "City Surveillance VMS",
    vendor: "Genetec",
    version: "5.12",
    department: "Municipal Corporation",
    endpoint: "vms-municipal-demo.local",
    cameras: 1,
    status: "Active",
  },
  {
    id: "vms-003",
    name: "Transport VMS",
    vendor: "HikCentral",
    version: "2.6",
    department: "Transport Department",
    endpoint: "vms-transport-demo.local",
    cameras: 1,
    status: "Active",
  },
  {
    id: "vms-004",
    name: "Smart City VMS",
    vendor: "Nx Witness",
    version: "6.0",
    department: "Smart City Mission",
    endpoint: "vms-smartcity-demo.local",
    cameras: 1,
    status: "Inactive",
  },
];

const departmentOptions = [
  "Police Department",
  "Municipal Corporation",
  "Transport Department",
  "Smart City Mission",
];

function VMSSystems() {
  const [vmsSystems, setVmsSystems] = useState(initialVMS);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingVMS, setEditingVMS] = useState(null);

  const [selectedVMS, setSelectedVMS] = useState(null);

  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    vendor: "",
    version: "",
    department: "",
    endpoint: "",
    cameras: 0,
    status: "Active",
  });

  const filteredVMS = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return vmsSystems;
    }

    return vmsSystems.filter((vms) =>
      [
        vms.name,
        vms.vendor,
        vms.version,
        vms.department,
        vms.endpoint,
      ].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [vmsSystems, search]);

  const totalVMS = vmsSystems.length;

  const activeVMS = vmsSystems.filter(
    (vms) => vms.status === "Active"
  ).length;

  const totalCameras = vmsSystems.reduce(
    (total, vms) => total + Number(vms.cameras || 0),
    0
  );

  const openAddForm = () => {
    setEditingVMS(null);

    setFormData({
      name: "",
      vendor: "",
      version: "",
      department: "",
      endpoint: "",
      cameras: 0,
      status: "Active",
    });

    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (vms) => {
    setEditingVMS(vms);

    setFormData({
      name: vms.name,
      vendor: vms.vendor,
      version: vms.version,
      department: vms.department,
      endpoint: vms.endpoint,
      cameras: vms.cameras,
      status: vms.status,
    });

    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingVMS(null);
    setFormError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedVendor = formData.vendor.trim();
    const trimmedVersion = formData.version.trim();
    const trimmedDepartment = formData.department.trim();
    const trimmedEndpoint = formData.endpoint.trim();

    if (
      !trimmedName ||
      !trimmedVendor ||
      !trimmedVersion ||
      !trimmedDepartment
    ) {
      setFormError(
        "VMS name, vendor, version and department are required."
      );
      return;
    }

    const duplicateVMS = vmsSystems.some(
      (vms) =>
        vms.name.toLowerCase() === trimmedName.toLowerCase() &&
        vms.id !== editingVMS?.id
    );

    if (duplicateVMS) {
      setFormError(
        "A VMS with this name already exists. Please use another name."
      );
      return;
    }

    const vmsData = {
      name: trimmedName,
      vendor: trimmedVendor,
      version: trimmedVersion,
      department: trimmedDepartment,
      endpoint: trimmedEndpoint || "Not configured",
      cameras: Number(formData.cameras) || 0,
      status: formData.status,
    };

    if (editingVMS) {
      setVmsSystems((previous) =>
        previous.map((vms) =>
          vms.id === editingVMS.id
            ? {
                ...vms,
                ...vmsData,
              }
            : vms
        )
      );
    } else {
      setVmsSystems((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          ...vmsData,
        },
      ]);
    }

    closeForm();
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Server size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              VMS Systems
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage Video Management Systems connected to the central CCTV registry.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          <Plus size={18} />
          Add VMS
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total VMS
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalVMS}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
              <Server size={21} />
            </div>

          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Active VMS
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeVMS}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
              <Activity size={21} />
            </div>

          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Managed Cameras
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalCameras}
              </p>
            </div>

            <div className="rounded-lg bg-violet-50 p-3 text-violet-700">
              <Video size={21} />
            </div>

          </div>
        </div>

      </div>

      {/* VMS Registry */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              VMS Registry
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Video management systems currently registered in the platform.
            </p>
          </div>

          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search VMS systems..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-[1050px] w-full text-left">

            <thead className="bg-slate-50">

              <tr className="border-b border-slate-200">

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  VMS System
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vendor / Version
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Cameras
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredVMS.length > 0 ? (
                filteredVMS.map((vms) => (
                  <tr
                    key={vms.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* VMS Name */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <Server size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {vms.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {vms.endpoint}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Vendor */}
                    <td className="px-5 py-4">

                      <p className="text-sm font-semibold text-slate-700">
                        {vms.vendor}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Version {vms.version}
                      </p>

                    </td>

                    {/* Department */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building2
                          size={16}
                          className="text-slate-400"
                        />

                        {vms.department}
                      </div>

                    </td>

                    {/* Cameras */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Video
                          size={16}
                          className="text-slate-400"
                        />

                        {vms.cameras}
                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          vms.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >

                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            vms.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {vms.status}

                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => setSelectedVMS(vms)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditForm(vms)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <div className="rounded-full bg-slate-100 p-4 text-slate-400">
                        <Server size={24} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No VMS systems found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search term.
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-5 py-3">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredVMS.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {vmsSystems.length}
            </span>{" "}
            VMS systems
          </p>

        </div>

      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  {editingVMS
                    ? "Edit VMS System"
                    : "Register VMS System"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add VMS metadata to the central CCTV registry.
                </p>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-6"
            >

              {formError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* VMS Name */}
                <div>
                  <label
                    htmlFor="vms-name"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    VMS Name
                  </label>

                  <input
                    id="vms-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Example: Central VMS"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Vendor */}
                <div>
                  <label
                    htmlFor="vms-vendor"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Vendor
                  </label>

                  <input
                    id="vms-vendor"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                    placeholder="Example: Milestone"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Version */}
                <div>
                  <label
                    htmlFor="vms-version"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    VMS Version
                  </label>

                  <input
                    id="vms-version"
                    name="version"
                    value={formData.version}
                    onChange={handleInputChange}
                    placeholder="Example: 2024 R3"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    htmlFor="vms-department"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Department
                  </label>

                  <select
                    id="vms-department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select department
                    </option>

                    {departmentOptions.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}

                  </select>
                </div>

                {/* Endpoint */}
                <div>
                  <label
                    htmlFor="vms-endpoint"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    VMS Endpoint
                  </label>

                  <input
                    id="vms-endpoint"
                    name="endpoint"
                    value={formData.endpoint}
                    onChange={handleInputChange}
                    placeholder="Example: vms-demo.local"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Cameras */}
                <div>
                  <label
                    htmlFor="vms-cameras"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Connected Cameras
                  </label>

                  <input
                    id="vms-cameras"
                    name="cameras"
                    type="number"
                    min="0"
                    value={formData.cameras}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Status */}
                <div className="md:col-span-2">

                  <label
                    htmlFor="vms-status"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="vms-status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

              </div>

              {/* Form Actions */}
              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  {editingVMS
                    ? "Update VMS"
                    : "Register VMS"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* View VMS Modal */}
      {selectedVMS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Server size={19} />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    {selectedVMS.name}
                  </h2>

                  <p className="text-xs font-medium text-slate-500">
                    {selectedVMS.vendor} · Version{" "}
                    {selectedVMS.version}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedVMS(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Details */}
            <div className="space-y-5 p-5 sm:p-6">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Vendor */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Vendor
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {selectedVMS.vendor}
                  </p>

                </div>

                {/* Version */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Version
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {selectedVMS.version}
                  </p>

                </div>

                {/* Department */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Department
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">

                    <Building2
                      size={16}
                      className="text-slate-500"
                    />

                    {selectedVMS.department}

                  </div>

                </div>

                {/* Status */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      selectedVMS.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {selectedVMS.status}
                  </span>

                </div>

              </div>

              {/* Endpoint */}
              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  VMS Endpoint
                </p>

                <p className="mt-1 break-all text-sm font-medium text-slate-800">
                  {selectedVMS.endpoint}
                </p>

              </div>

              {/* Camera Relationship */}
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="rounded-lg bg-white p-2 text-blue-700">
                    <Video size={18} />
                  </div>

                  <div>

                    <p className="text-sm font-bold text-slate-900">
                      Camera Integration
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      This VMS currently manages{" "}
                      <span className="font-bold text-slate-900">
                        {selectedVMS.cameras}
                      </span>{" "}
                      registered camera
                      {selectedVMS.cameras === 1
                        ? ""
                        : "s"} in the demonstration registry.
                    </p>

                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end border-t border-slate-200 pt-4">

                <button
                  type="button"
                  onClick={() => setSelectedVMS(null)}
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default VMSSystems;