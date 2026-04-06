const Record = require("../models/record.model");


const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    const record = await Record.create({
      user: req.user.id,
      amount,
      type,
      category,
      date,
      note
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getRecords = async (req, res) => {
  try {
    let filter = {};
    
    // ROLE-BASED ACCESS    
    if (req.user.role !== "admin" && req.user.role !== "viewer") {
      filter.user = req.user.id;
    }
    
    // filters
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;
    
    // DATE FILTER
    if (req.query.startDate && req.query.endDate) {
        filter.date = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate)
        }
    };
    // search
    if (req.query.search) {
      filter.$or = [
        { note: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
        { type: { $regex: req.query.search, $options: "i" } }
      ];
    }

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Record.countDocuments(filter);


    res.json({
        success: true,
        total,
        page,
        limit,
        data: records
    });
}
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    // record not found
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // RBAC check
    if (
      req.user.role !== "admin" &&
      record.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await record.deleteOne();

    res.status(200).json({
      success: true,
      message: "Record deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createRecord,
  getRecords,
  deleteRecord
};