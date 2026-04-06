import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* WELCOME */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome back, <span className="text-green-600">{user?.name}</span> 👋
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Income</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{data.totalIncome.toLocaleString()}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Expense</p>
          <p className="text-2xl font-bold text-red-500">
            ₹{data.totalExpense.toLocaleString()}
          </p>
        </div>

        <div className={`rounded-xl p-5 border ${data.netBalance >= 0 ? "bg-blue-50 border-blue-200" : "bg-orange-50 border-orange-200"}`}>
          <p className="text-sm text-gray-500 mb-1">Net Balance</p>
          <p className={`text-2xl font-bold ${data.netBalance >= 0 ? "text-blue-600" : "text-orange-500"}`}>
            ₹{data.netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Category Breakdown
        </h3>
        {data.categoryBreakdown.length === 0 ? (
          <p className="text-gray-400 text-sm">No data yet</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.categoryBreakdown.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-3"
              >
                <p className="text-sm text-gray-500 capitalize">{item._id}</p>
                <p className="text-base font-semibold text-gray-800">
                  ₹{item.total.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h3>
        {data.recentTransactions.length === 0 ? (
          <p className="text-gray-400 text-sm">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {data.recentTransactions.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700 capitalize">
                    {item.category}
                  </p>
                  <p className="text-xs text-gray-400">{item.note || "No note"}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${item.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {item.type === "income" ? "+" : "-"}₹{item.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;