"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function History() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUserEmail(data.email);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:px-6 lg:px-8">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-4"
      >
        <div className="bg-white p-8 shadow-lg rounded-lg text-center mb-10">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Prediction History
          </h2>
          {userEmail ? (
            <>
              <p className="mt-4 text-gray-600 text-center">
                View your past predictions and download them as a PDF.
              </p>
              <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
                Download History
              </button>
            </>
          ) : (
            <p className="mt-4 text-red-600 text-center">
              Please log in to view your prediction history.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
