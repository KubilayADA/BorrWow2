const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const secret = require("../config/secretGenerator");
const mongoose = require("mongoose");


// Health Check Route
router.get("/", (req, res) => {
  res.json("All good in auth");
});

//apply bonus
const applyReferralBonus = async (referralCode, newUserId, session) => {
  const session = await mongoose.startSession();
 
  
  try {
  // find inviter by the referal code
    const referrer = await User.findOne({ inviteCode: referralCode }).session(session);
    
    if (!referrer) {
      throw new Error("INVALID_REFERRAL");
    }

      // give trustpoint to  referrer
      await User.findByIdAndUpdate(
        referrer._id,
        {
          $inc: { trustpoints: 30 },
          $push: { referredUsers: newUserId }
        },
        { session }
      );
  
      // give trustpoint to new user
      await User.findByIdAndUpdate(
        newUserId,
        {
          $inc: { trustpoints: 30 },
          referredBy: referrer._id
        },
        { session }
      );
    } catch (error) {
      throw error;
    }
  };

// POST Signup

router.post("/signup", async (req, res, next) => {
  const { password, referralCode, ...userData } = req.body;
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      const salt = bcrypt.genSaltSync(13);
      const passwordHash = bcrypt.hashSync(password, salt);

      // Validate referral code FIRST
      let referrer = null;
      if (referralCode) {
        referrer = await User.findOne({ inviteCode: referralCode }).session(session);
        if (!referrer) {
          throw new Error("INVALID_REFERRAL");
        }
      }

      // Create user
      const [newUser] = await User.create([{
        ...userData,
        passwordHash,
        referredBy: referrer?._id || null
      }], { session });

      // Apply referral bonus if valid
      if (referrer) {
        await applyReferralBonus(referralCode, newUser._id, session);
      }

      return newUser;
    });

    res.status(201).json({ success: true });
  } catch (error) {
    const errorMap = {
      INVALID_REFERRAL: { status: 400, message: "Invalid referral code" },
      "11000": { 
        status: 400,
        message: `${Object.keys(error.keyPattern)?.[0] || 'Field'} already exists`
      }
    };

    const matchedError = errorMap[error.message] || errorMap[error.code];
    if (matchedError) {
      return res.status(matchedError.status).json({ error: matchedError.message });
    }

    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    session.endSession();
  }
});

// POST Login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const potentialUser = await User.findOne({ username });
    if (potentialUser) {
      if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
        const token = jwt.sign({ userId: potentialUser._id }, secret, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.json({ token }); // Only return the token
      } else {
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "No user with this username" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json({ userId: req.tokenPayload.userId, message: "Token valid" });
});
module.exports = router;
