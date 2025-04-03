import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  heartRate: Number,
  bloodPressure: Number,
  cholesterol: Number,
  riskLevel: String, // Low, Medium, High
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Prediction ||
  mongoose.model("Prediction", predictionSchema);
