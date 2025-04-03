import { NextResponse } from "next/server";

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
    const {
      age,
      bloodPressure,
      cholesterol,
      heartRate,
      bmi,
      smoker,
      diabetic,
    } = await req.json();

    // console.log("Received Data:", {
    //   age,
    //   bloodPressure,
    //   cholesterol,
    //   heartRate,
    //   bmi,
    //   smoker,
    //   diabetic,
    // });

    const riskScore = calculateRiskScore({
      age,
      bloodPressure,
      cholesterol,
      heartRate,
      bmi,
      smoker,
      diabetic,
    });

    const riskLevel = determineRiskLevel(riskScore);

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
