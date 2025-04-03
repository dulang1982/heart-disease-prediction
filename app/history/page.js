"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "pdfmake/build/vfs_fonts"; // Correct import
pdfMake.vfs = vfs;

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

  const downloadPDF = () => {
    const tableData = predictions.map((prediction) => [
      formatDate(prediction.date),
      prediction.age,
      prediction.bloodPressure,
      prediction.cholesterol,
      prediction.heartRate,
      prediction.bmi,
      prediction.smoker,
      prediction.diabetic,
      prediction.score,
      prediction.level,
    ]);

    const docDefinition = {
      pageMargins: [30, 10, 20, 10], // Left, Top, Right, Bottom
      content: [
        { text: "Prediction History", style: "header" },
        {
          text: [
            { text: "Name: ", bold: true },
            { text: `${user.name}\n` }, 
            { text: "Email: ", bold: true },
            { text: `${user.email}\n` },
          ],
          margin: [0, 10, 0, 10], // Margin for spacing
        },
        {
          table: {
            body: [
              [
                "Date",
                "Age",
                "Blood Pressure",
                "Cholesterol",
                "Heart Rate",
                "BMI",
                "Smoker",
                "Diabetic",
                "Score",
                "Level",
              ],
              ...tableData,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: "center",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("prediction-history.pdf");
  };

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
        <div className="bg-white p-8 shadow-lg rounded-lg text-center mb-10">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Prediction History
          </h2>
          {user ? (
            <>
              <p className="my-2 text-gray-600 text-center">
                View your past predictions and download them as a PDF.
              </p>
              <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download PDF
              </button>
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
