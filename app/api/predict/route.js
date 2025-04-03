import { verify } from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Prediction from "@/models/Prediction";

const calculateRiskScore = (patient) => {
  const WEIGHTS = {
    age: 0.1,
    bloodPressure: 0.2,
    cholesterol: 0.3,
    heartRate: 0.1,
    obesityLevel: 0.15,
    smoker: 0.4,
    diabetic: 0.3,
  };

  // Convert form data to appropriate numeric values
  const normalized = {
    age: patient.age / 100,
    bloodPressure: patient.bloodPressure / 200,
    cholesterol: patient.cholesterol / 300,
    heartRate: patient.heartRate / 150,
    obesityLevel: patient.bmi / 50,
  };

  return (
    (normalized.age * WEIGHTS.age +
      normalized.bloodPressure * WEIGHTS.bloodPressure +
      normalized.cholesterol * WEIGHTS.cholesterol +
      normalized.heartRate * WEIGHTS.heartRate +
      normalized.obesityLevel * WEIGHTS.obesityLevel +
      (patient.smoker === "Yes" ? WEIGHTS.smoker : 0) +
      (patient.diabetic === "Yes" ? WEIGHTS.diabetic : 0)) *
    100
  );
};

const determineRiskLevel = (score) => {
  if (score < 20) return "Low";
  if (score < 50) return "Medium";
  return "High";
};

export async function POST(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET); // Verify the JWT token
    const user = await User.findById(decoded.userId); // Find the user by ID

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const {
      age,
      bloodPressure,
      cholesterol,
      heartRate,
      bmi,
      smoker,
      diabetic,
    } = await req.json(); // Extract patient data from the request body

    // console.log("Received Data:", {
    //   age,
    //   bloodPressure,
    //   cholesterol,
    //   heartRate,
    //   bmi,
    //   smoker,
    //   diabetic,
    // });

    // Calculate the risk score
    const riskScore = calculateRiskScore({
      age,
      bloodPressure,
      cholesterol,
      heartRate,
      bmi,
      smoker,
      diabetic,
    });

    // Determine the risk level based on the score
    const riskLevel = determineRiskLevel(riskScore);

    // Generate suggestions based on the risk level
    const suggestions =
      riskLevel === "High"
        ? [
            "Consult a cardiologist",
            "Adopt a healthy diet",
            "Increase physical activity",
          ]
        : riskLevel === "Medium"
        ? ["Monitor your health", "Exercise regularly", "Reduce stress"]
        : [
            "Maintain a balanced diet",
            "Stay active",
            "Regular health check-ups",
          ];

    // Save the prediction to the database associated with the user
    const newPrediction = new Prediction({
      userId: user._id, // Associate the prediction with the logged-in user
      age,
      bloodPressure,
      cholesterol,
      heartRate,
      bmi,
      smoker,
      diabetic,
      score: riskScore.toFixed(1),
      level: riskLevel,
    });

    await newPrediction.save(); // Save the prediction

    return NextResponse.json({
      score: riskScore.toFixed(1),
      level: riskLevel,
      suggestions,
      thresholds: { low: 20, medium: 50, high: 100 },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
