const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const testimonialSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 10, 
    },
    rating: {
      type: Number,
      min: 1, 
      max: 5, 
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = model("Testimonial", testimonialSchema);

module.exports = Testimonial;
