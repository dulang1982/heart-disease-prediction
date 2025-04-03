"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: "",
    bloodPressure: "",
    cholesterol: "",
    heartRate: "",
    bmi: "",
    smoker: "No",
    diabetic: "No",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "age",
      "bloodPressure",
      "cholesterol",
      "heartRate",
      "bmi",
      "smoker",
      "diabetic",
    ];

    const missingFields = requiredFields.filter(
      (key) => formData[key] === "" || formData[key] === null
    );

    if (missingFields.length > 0) {
      alert(`All fields are required. Missing: ${missingFields.join(", ")}`);
      return;
    }

    // console.log("Form Data before sending:", formData);

    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    // console.log("API Response:", data);

    setPredictionResult(data); // Set the API response to predictionResult
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:px-6 lg:px-8">
      <Navbar/>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-4"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Heart Disease Risk Prediction
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
                  { label: "Age", name: "age", placeholder: "45" },
                  {
                    label: "Blood Pressure",
                    name: "bloodPressure",
                    placeholder: "120",
                  },
                  {
                    label: "Cholesterol",
                    name: "cholesterol",
                    placeholder: "200",
                  },
                  { label: "Heart Rate", name: "heartRate", placeholder: "72" },
                  { label: "BMI", name: "bmi", placeholder: "24.5" },
                ].map(({ label, name, placeholder }) => (
                  <div key={name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="number"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required
                      className="text-gray-700 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder={`e.g. ${placeholder}`}
                    />
                  </div>
                ))}

                {["smoker", "diabetic"].map((label) => (
                  <div key={label} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </label>
                    <select
                      name={label}
                      value={formData[label]}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
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

            {/* Results Section */}
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
                  <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mr-4">
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
                  </div>

                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-4">
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
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">
                      Risk Score:{" "}
                      {parseFloat(predictionResult.score).toFixed(1)}
                    </h3>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Recommendations:
                      </h4>
                      <ul className="space-y-2">
                        {predictionResult.suggestions.map(
                          (suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-gray-700">
                                {suggestion}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
