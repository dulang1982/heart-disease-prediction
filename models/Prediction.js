import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: { type: Number, required: true },
    bloodPressure: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    bmi: { type: Number, required: true },
    smoker: { type: String, enum: ["Yes", "No"], required: true },
    diabetic: { type: String, enum: ["Yes", "No"], required: true },
    score: { type: Number, required: true },
    level: { type: String, enum: ["Low", "Medium", "High"], required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Prediction ||
  mongoose.model("Prediction", predictionSchema);
