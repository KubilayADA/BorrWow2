const { Schema, model } = require("mongoose");
/* const bcrypt = require("bcryptjs");
const saltRounds = 10; */

// TODO: Please make sure you edit the Book model to whatever makes sense in this case, and this file to the correct model name.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      unique: [true, "Username already exists"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    trustpoints: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
    },
    referredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    referredUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    redeemedItems: [{
      itemId: Number,
      name: String,
      cost: Number,
      redeemedAt: Date
    }],
    
    inviteCode: {
      type: String,
      unique: true,
      sparse: true,
      index : true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

/* // hash user password before saving into database


userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
}); */

module.exports = User;
