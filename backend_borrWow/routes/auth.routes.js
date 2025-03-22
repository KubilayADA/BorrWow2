const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const secret = require("../config/secretGenerator");


// Health Check Route
router.get("/", (req, res) => {
  res.json("All good in auth");
});

//apply bonus
const applyReferralBonus = async (referralCode, newUserId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
  // find inviter by the referal code
    const referrer = await User.findOne({ inviteCode: referralCode }).session(session);
    
    if (!referrer) {
      throw new Error("Invalid referral code");
    }

    // give the trustpoint the inviter
    referrer.trustpoints += 30;
    referrer.referredUsers.push(newUserId);
    await referrer.save({ session });

    // give the trustpoint to the new user
    await User.findByIdAndUpdate(
      newUserId,
      { 
        referredBy: referrer._id,
        $inc: { trustpoints: 30 } 
      },
      { session }
    );

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// POST Signup
router.post("/signup", async (req, res, next) => {
  const {password, referralCode, ...userData} = req.body;
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  const session = await mongoose.startSession();
  session.startTransaction();

 try {
    // Create new user
    if (referralCode) {
      const referrer = await User.findOne({ inviteCode: referralCode }).session(session);
      if (!referrer) {
        throw new Error("Invalid referral code");
      }
    }
    const newUser = await User.create([{ 
      ...userData, 
      passwordHash,
      referredBy: null 
    }], { session });

    // apply bonus if the user has valid code
    if (referralCode) {
      await applyReferralBonus(referralCode, newUser[0]._id, session);
    }
    await session.commitTransaction();
    res.status(201).json(newUser[0]);
  } catch (error) {
    await session.abortTransaction();
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` // check if capitalizeFirstLetter is needed
      });
    } else if (error.message === "Invalid referral code") {
      res.status(400).json({ message: "Invalid referral code" });
    } else {
      next(error);
    }
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
