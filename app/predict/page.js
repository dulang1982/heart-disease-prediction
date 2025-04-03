"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: "",
    bloodPressure: "",
    cholesterol: "",
    heartRate: "",
    obesityLevel: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setPredictionResult(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Heart Disease Risk Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Enter your health metrics to evaluate your cardiovascular risk
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Age",
                  "Blood Pressure",
                  "Cholesterol",
                  "Heart Rate",
                  "BMI",
                ].map((label, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="number"
                      name={label.toLowerCase().replace(" ", "")}
                      value={formData[label.toLowerCase().replace(" ", "")]}
                      onChange={handleInputChange}
                      required
                      className="text-gray-700 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder={`e.g. ${
                        label === "Age"
                          ? "45"
                          : label === "Blood Pressure"
                          ? "120"
                          : label === "Cholesterol"
                          ? "200"
                          : label === "Heart Rate"
                          ? "72"
                          : "24.5"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                    isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } shadow-md hover:shadow-lg flex items-center justify-center`}
                >
                  {isLoading ? (
                    <span className="animate-spin h-5 w-5 mr-3">🔄</span>
                  ) : (
                    "Calculate My Risk"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {predictionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mt-8 rounded-xl shadow-lg overflow-hidden ${
              predictionResult.level === "High"
                ? "bg-red-50 border-l-4 border-red-500"
                : predictionResult.level === "Medium"
                ? "bg-yellow-50 border-l-4 border-yellow-500"
                : "bg-green-50 border-l-4 border-green-500"
            }`}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your Results
              </h2>
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  predictionResult.level === "High"
                    ? "bg-red-100 text-red-800"
                    : predictionResult.level === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {predictionResult.level} Risk
              </span>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                  className={`h-4 rounded-full ${
                    predictionResult.level === "High"
                      ? "bg-red-500"
                      : predictionResult.level === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (predictionResult.score / 100) * 100
                    )}%`,
                  }}
                ></div>
              </div>

              <h3 className="mt-4 font-medium text-gray-700">
                Risk Score: {predictionResult.score.toFixed(1)}
              </h3>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Recommendations:
                </h4>
                <ul className="space-y-2">
                  {predictionResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 text-blue-500 mr-2">✔️</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            This tool is for informational purposes only. Consult a healthcare
            professional for medical advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
