import { useMemo, useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Eye,
  Pencil,
  X,
  MapPin,
  Camera,
} from "lucide-react";

const initialDepartments = [
  {
    id: "dept-001",
    code: "GJ-POL",
    name: "Police Department",
    district: "Statewide",
    contact: "State Control Room",
    cameras: 2,
    status: "Active",
  },
  {
    id: "dept-002",
    code: "GJ-MUN",
    name: "Municipal Corporation",
    district: "Ahmedabad",
    contact: "City Control Room",
    cameras: 1,
    status: "Active",
  },
  {
    id: "dept-003",
    code: "GJ-TRN",
    name: "Transport Department",
    district: "Vadodara",
    contact: "Transport Control Room",
    cameras: 1,
    status: "Active",
  },
  {
    id: "dept-004",
    code: "GJ-SCT",
    name: "Smart City Mission",
    district: "Gandhinagar",
    contact: "Smart City Control Room",
    cameras: 1,
    status: "Active",
  },
];

function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingDepartment, setEditingDepartment] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    district: "",
    contact: "",
    status: "Active",
    cameras: 0,
  });

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return departments;
    }

    return departments.filter((department) =>
      [
        department.code,
        department.name,
        department.district,
        department.contact,
      ].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [departments, search]);

  const totalDepartments = departments.length;

  const activeDepartments = departments.filter(
    (department) => department.status === "Active"
  ).length;

  const totalCameras = departments.reduce(
    (total, department) => total + Number(department.cameras || 0),
    0
  );

  const openAddForm = () => {
    setEditingDepartment(null);

    setFormData({
      code: "",
      name: "",
      district: "",
      contact: "",
      status: "Active",
      cameras: 0,
    });

    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (department) => {
    setEditingDepartment(department);

    setFormData({
      code: department.code,
      name: department.name,
      district: department.district,
      contact: department.contact,
      status: department.status,
      cameras: department.cameras,
    });

    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingDepartment(null);
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

    const trimmedCode = formData.code.trim().toUpperCase();
    const trimmedName = formData.name.trim();
    const trimmedDistrict = formData.district.trim();
    const trimmedContact = formData.contact.trim();

    if (!trimmedCode || !trimmedName || !trimmedDistrict) {
      setFormError(
        "Department code, department name and district are required."
      );
      return;
    }

    const duplicateCode = departments.some(
      (department) =>
        department.code.toLowerCase() === trimmedCode.toLowerCase() &&
        department.id !== editingDepartment?.id
    );

    if (duplicateCode) {
      setFormError(
        "This department code already exists. Please use another code."
      );
      return;
    }

    const departmentData = {
      code: trimmedCode,
      name: trimmedName,
      district: trimmedDistrict,
      contact: trimmedContact || "Not provided",
      status: formData.status,
      cameras: Number(formData.cameras) || 0,
    };

    if (editingDepartment) {
      setDepartments((previous) =>
        previous.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...departmentData,
              }
            : department
        )
      );
    } else {
      setDepartments((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          ...departmentData,
        },
      ]);
    }

    closeForm();
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Departments
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage departments participating in the central CCTV registry.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Departments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalDepartments}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
              <Building2 size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Departments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeDepartments}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
              <Building2 size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Registered Cameras
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalCameras}
              </p>
            </div>

            <div className="rounded-lg bg-violet-50 p-3 text-violet-700">
              <Camera size={21} />
            </div>
          </div>
        </div>

      </div>

      {/* Search + Registry */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Department Registry
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Department metadata currently registered in the platform.
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
              placeholder="Search departments..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-[900px] w-full text-left">

            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Coverage
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Control Room
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

              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <tr
                    key={department.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Department */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <Building2 size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {department.name}
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-500">
                            {department.code}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Coverage */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        {department.district}
                      </div>

                    </td>

                    {/* Control Room */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {department.contact}
                    </td>

                    {/* Cameras */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Camera size={16} className="text-slate-400" />
                        {department.cameras}
                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          department.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            department.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {department.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => setSelectedDepartment(department)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditForm(department)}
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
                        <Building2 size={24} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No departments found
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

        {/* Table Footer */}
        <div className="border-t border-slate-200 px-5 py-3">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredDepartments.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {departments.length}
            </span>{" "}
            departments
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
                  {editingDepartment
                    ? "Edit Department"
                    : "Register Department"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add department metadata to the central CCTV registry.
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
            <form onSubmit={handleSubmit} className="p-5 sm:p-6">

              {formError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Department Code */}
                <div>
                  <label
                    htmlFor="department-code"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Department Code
                  </label>

                  <input
                    id="department-code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Example: GJ-POL"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Department Name */}
                <div>
                  <label
                    htmlFor="department-name"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Department Name
                  </label>

                  <input
                    id="department-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Example: Police Department"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* District */}
                <div>
                  <label
                    htmlFor="department-district"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    District / Coverage
                  </label>

                  <input
                    id="department-district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Example: Ahmedabad"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Control Room */}
                <div>
                  <label
                    htmlFor="department-contact"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Control Room / Contact
                  </label>

                  <input
                    id="department-contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Example: State Control Room"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Camera Count */}
                <div>
                  <label
                    htmlFor="department-cameras"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Registered Cameras
                  </label>

                  <input
                    id="department-cameras"
                    name="cameras"
                    type="number"
                    min="0"
                    value={formData.cameras}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="department-status"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="department-status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
                  {editingDepartment
                    ? "Update Department"
                    : "Register Department"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* View Department Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Building2 size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    {selectedDepartment.name}
                  </h2>

                  <p className="text-xs font-medium text-slate-500">
                    {selectedDepartment.code}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedDepartment(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Details */}
            <div className="space-y-5 p-5 sm:p-6">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Coverage
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <MapPin size={16} className="text-slate-500" />
                    {selectedDepartment.district}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      selectedDepartment.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {selectedDepartment.status}
                  </span>
                </div>

              </div>

              {/* Control Room */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Control Room / Contact
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {selectedDepartment.contact}
                </p>
              </div>

              {/* Camera Relationship */}
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="rounded-lg bg-white p-2 text-blue-700">
                    <Camera size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      CCTV Registry Relationship
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      This department currently has{" "}
                      <span className="font-bold text-slate-900">
                        {selectedDepartment.cameras}
                      </span>{" "}
                      registered camera
                      {selectedDepartment.cameras === 1 ? "" : "s"} in the
                      demonstration registry.
                    </p>
                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end border-t border-slate-200 pt-4">

                <button
                  type="button"
                  onClick={() => setSelectedDepartment(null)}
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

export default Departments;