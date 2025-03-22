const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/:userId/invite-code", isAuthenticated, async (req, res) => {
  try {
    
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    if (!user.inviteCode) {
      user.inviteCode = await generateUniqueCode(); 
      await user.save();
    }
    
    res.json({ 
      code: user.inviteCode,
      referralLink: `${process.env.FRONTEND_URL}/signup?ref=${user.inviteCode}`
    });
  } catch (error) {
    console.error("Invite code error:", error);
    res.status(500).json({ error: "Failed to generate invitation code" });
  }
});



const generateUniqueCode = async () => {
  let code;
  let isUnique = false;
  
  while (!isUnique) {
    code = Math.random().toString(36).substr(2, 8).toUpperCase();
    const existingUser = await User.findOne({ inviteCode: code });
    if (!existingUser) isUnique = true;
  }
  
  return code;
};







router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure that the user can only edit their own profile
    if (id !== req.tokenPayload.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedProfile = { ...req.body };
    delete updatedProfile.passwordHash;

    const updatedUser = await User.findByIdAndUpdate(id, updatedProfile, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "No User with this ID" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user by ID (authenticated route)
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure that the user can only delete their own profile
    if (id !== req.tokenPayload.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "No User with this ID" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;