const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/", isAuthenticated, async (req, res) => {
  try {
    // get user from token
    const user = await User.findById(req.tokenPayload.userId);
    const { itemId } = req.body;

    const redeemableItems = [
      { id: 1, name: "Premium Toolset", cost: 50 },
      { id: 2, name: "Gardening Kit", cost: 75 },
      { id: 3, name: "DIY Starter Pack", cost: 100 },
    ];

    const item = redeemableItems.find(i => i.id === itemId);
    if (!item) return res.status(400).json({ error: "Invalid item" });

    if (user.trustpoints < item.cost) {
      return res.status(400).json({ error: "Insufficient trust points" });
    }

    // update the userrrrr
    user.trustpoints -= item.cost;
    user.redeemedItems.push({
      itemId: item.id,
      name: item.name,
      cost: item.cost,
      redeemedAt: new Date(),
    });

    await user.save();

    res.json({
      success: true,
      newBalance: user.trustpoints,
      redeemedItem: item,
    });
  } catch (error) {
    console.error('Redemption error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
