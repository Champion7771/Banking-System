import { useEffect, useState } from "react";
import API from "../api/axios";

function Records() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await API.get("/records", {
          params: { search, type, page, limit, startDate, endDate }
        });
        setRecords(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        setError("Failed to fetch records");
      }
    };
    fetchRecords();
  }, [search, type, page, startDate, endDate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/records/${id}`);
      setRecords(prev => prev.filter(r => r._id !== id));
      setTotal(prev => prev - 1);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setType("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Records</h2>

      {/* FILTERS */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-3">

        {/* ROW 1 - Search + Type */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by note, category..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
          />

          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 "
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* ROW 2 - Date Filter */}
        <div className="flex flex-wrap gap-3 items-center">
          <div>
            <label className="block text-xs text-gray-500 mb-1">From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={clearFilters}
            className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg transition"
          >
            Clear All
          </button>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">{error}</p>
      )}

      {/* RECORDS LIST */}
      {records.length === 0 ? (
        <p className="text-gray-400 text-sm">No records found</p>
      ) : (
        <div className="space-y-3">
          {records.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition"
            >
              <div>
                <p className="text-sm font-semibold text-gray-700 capitalize">
                  {r.category}
                </p>
                <p className="text-xs text-gray-400">{r.note || "No note"}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <p className={`text-base font-bold ${r.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {r.type === "income" ? "+" : "-"}₹{r.amount.toLocaleString()}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${r.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                  {r.type}
                </span>

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-xs text-red-500 hover:text-red-700 hover:underline transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition"
          >
            ← Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition"
          >
            Next →
          </button>
        </div>
      )}

    </div>
  );
}

export default Records;