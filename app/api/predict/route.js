import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { age, bloodPressure, cholesterol, heartRate, obesityLevel } =
      await req.json();

    // Simple calculation for risk assessment
    const riskScore =
      (bloodPressure / 200) * 30 +
      (cholesterol / 300) * 30 +
      (heartRate / 100) * 20 +
      (obesityLevel / 40) * 20;

    let riskLevel = "Low";
    if (riskScore > 60) {
      riskLevel = "High";
    } else if (riskScore > 30) {
      riskLevel = "Medium";
    }

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
      score: riskScore,
      level: riskLevel,
      suggestions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
