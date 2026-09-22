import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  User,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

function Login() {
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

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = demoUsers.find(
      (item) =>
        item.username === username.trim() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid username or password.");
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

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Gujarat CCTV Platform
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Secure administrative access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Sign in
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Enter your authorised credentials to continue.
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
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
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
                  onChange={(e) => setPassword(e.target.value)}
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

          {/* Demo notice */}
          <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              Demo authentication is currently enabled for frontend
              demonstration. Production authentication will be handled
              securely by the backend.
            </p>
          </div>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-5 text-sm text-slate-500 hover:text-blue-600 transition"
        >
          ← Return to public platform
        </button>

      </div>
    </div>
  );
}

export default Login;