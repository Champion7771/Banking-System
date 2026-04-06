const User = require("../models/user.model");


// GET ALL USERS (ADMIN)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE USER ROLE
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Role updated", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ACTIVATE / DEACTIVATE USER
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: "User status updated",
      isActive: user.isActive
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getUsers,
  updateUserRole,
  toggleUserStatus
};