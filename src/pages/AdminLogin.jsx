import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const demoUsers = [
    {
      username: "central.admin",
      password: "admin123",
      role: "CENTRAL_ADMIN",
      department: null,
    },
    {
      username: "police.admin",
      password: "police123",
      role: "DEPARTMENT_ADMIN",
      department: "Police Department",
    },
    {
      username: "transport.admin",
      password: "transport123",
      role: "DEPARTMENT_ADMIN",
      department: "Transport Department",
    },
  ];

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const user = demoUsers.find(
      (item) =>
        item.username === username.trim() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid administrator credentials.");
      return;
    }

    localStorage.setItem(
      "cctvUser",
      JSON.stringify({
        username: user.username,
        role: user.role,
        department: user.department,
      })
    );

    if (user.role === "CENTRAL_ADMIN") {
      navigate("/admin/central");
    } else {
      navigate("/admin/department");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Back to public platform */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to public platform
        </button>

        {/* Header */}
        <div className="text-center mb-7">

          <div className="mx-auto w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Administrator Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Gujarat CCTV Integration Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Secure Access
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Sign in using your authorised administrator account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 outline-none text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full h-11 pl-10 pr-11 rounded-lg border border-slate-300 outline-none text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />

                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              Administrator access is restricted. Production authentication
              and authorization will be enforced by the backend.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Centralised CCTV Registry & GIS Foundation
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;