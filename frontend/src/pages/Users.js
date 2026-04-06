import { useEffect, useState } from "react";
import API from "../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await API.put(`/users/${id}/role`, { role });
      fetchUsers();
    } catch {
      alert("Failed to update role");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`/users/${id}/status`);
      fetchUsers();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        User Management
      </h2>

      {error && (
        <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">{error}</p>
      )}

      {users.length === 0 ? (
        <p className="text-gray-400 text-sm">No users found</p>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-4 hover:shadow-sm transition"
            >
              {/* USER INFO */}
              <div>
                <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-400">{u.email}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                  u.isActive
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}>
                  {u.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                {/* ROLE DROPDOWN */}
                <select
                  value={u.role}
                  onChange={(e) => changeRole(u._id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>

                {/* TOGGLE STATUS */}
                <button
                  onClick={() => toggleStatus(u._id)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-lg transition ${
                    u.isActive
                      ? "bg-red-100 text-red-500 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {u.isActive ? "Deactivate" : "Activate"}
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Users;