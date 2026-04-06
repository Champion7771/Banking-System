const Record = require("../models/record.model");
const mongoose = require("mongoose");

const getDashboard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // TOTAL INCOME & EXPENSE
    const summary = await Record.aggregate([
      {
        $match: { user: userId }
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0;
    let expense = 0;

    summary.forEach(item => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    // CATEGORY BREAKDOWN
    const categoryData = await Record.aggregate([
      {
        $match: { user: userId}
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    // RECENT TRANSACTIONS
    const recent = await Record.find({
      user: new mongoose.Types.ObjectId(req.user.id)
    })
    .sort({ createdAt: -1 })
    .limit(5);

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
      categoryBreakdown: categoryData,
      recentTransactions: recent
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrends = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const trends = await Record.aggregate([
      {
        $match: { user: userId}
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json(trends);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getTrends };