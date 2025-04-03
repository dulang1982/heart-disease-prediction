"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function History() {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchUserAndPredictions = async () => {
      try {
        const res = await fetch("/api/history", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.userData);
          setPredictions(data.predictions);
        }
      } catch (error) {
        console.error("Error fetching user or predictions:", error);
      }
    };
    fetchUserAndPredictions();
  }, []);

  // Format date to "YYYY-MM-DD"
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-CA"); // 'en-CA' is the locale for 'YYYY-MM-DD' format
  };

  // const downloadPDF = () => {
  // };

  const getLevelColor = (level) => {
    if (level === "High") return "bg-red-500";
    if (level === "Medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:px-6 lg:px-8">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-4"
      >
        <div className="bg-white p-8 shadow-lg rounded-lg text-center mb-10 relative">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Prediction History
          </h2>
          {user ? (
            <>
              <p className="mt-4 text-gray-600 text-center">
                View your past predictions and download them as a PDF.
              </p>
              {/* <button
                onClick={downloadPDF}
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Download History
              </button> */}
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Date</th>
                      <th className="px-4 py-2 border-b text-left">Age</th>
                      <th className="px-4 py-2 border-b text-left">
                        Blood Pressure
                      </th>
                      <th className="px-4 py-2 border-b text-left">
                        Cholesterol
                      </th>
                      <th className="px-4 py-2 border-b text-left">
                        Heart Rate
                      </th>
                      <th className="px-4 py-2 border-b text-left">BMI</th>
                      <th className="px-4 py-2 border-b text-left">Smoker</th>
                      <th className="px-4 py-2 border-b text-left">Diabetic</th>
                      <th className="px-4 py-2 border-b text-left">Score</th>
                      <th className="px-4 py-2 border-b text-left">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.map((prediction) => (
                      <tr key={prediction._id}>
                        <td className="px-4 py-2 border-b">
                          {formatDate(prediction.date)}
                        </td>
                        <td className="px-4 py-2 border-b">{prediction.age}</td>
                        <td className="px-4 py-2 border-b">
                          {prediction.bloodPressure}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {prediction.cholesterol}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {prediction.heartRate}
                        </td>
                        <td className="px-4 py-2 border-b">{prediction.bmi}</td>
                        <td className="px-4 py-2 border-b">
                          {prediction.smoker}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {prediction.diabetic}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {prediction.score}
                        </td>
                        <td
                          className={`px-4 py-2 border-b text-white ${getLevelColor(
                            prediction.level
                          )}`}
                        >
                          {prediction.level}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="mt-4 text-red-400 text-center">
              Please log in to view your prediction history.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
