import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
      
      {/* LEFT - Brand */}
      <div
        onClick={() => navigate("/dashboard")}
        className="text-lg font-bold cursor-pointer tracking-wide"
      >
        💰 Finance Tracker
      </div>

      {/* MIDDLE - Nav Links */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/records")}
          className="px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition"
        >
          Records
        </button>

        {["admin", "analyst"].includes(user?.role) && (
          <button
            onClick={() => navigate("/add-record")}
            className="px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition"
          >
            + Add Record
          </button>
        )}

        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/users")}
            className="px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition"
          >
            Users
          </button>
        )}
      </div>

      {/* RIGHT - User Info + Logout */}
      <div className="flex items-center gap-3">
        <span className="text-sm">
          <span className="font-semibold">{user?.name ||""}</span>
          <span className="ml-1 bg-green-500 text-xs px-2 py-0.5 rounded-full capitalize">
            {user?.role || "none"}
          </span>
        </span>

        <button
          onClick={logout}
          className="bg-white text-green-700 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;