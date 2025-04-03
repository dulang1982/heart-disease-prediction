"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me"); // Adjust API route accordingly
        const data = await response.json();

        // Set user data in state
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-8 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <main className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-700">Name:</h3>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-700">Email:</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <Link
            href="/profile/edit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>

          <Link
            href="/auth/logout"
            className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
          >
            Log Out
          </Link>
        </div>
      </main>

      <footer className="w-full flex flex-wrap items-center justify-center gap-6 py-4 border-t text-gray-600">
        <p>
          This tool is for informational purposes only. Consult a healthcare
          professional for medical advice.
        </p>
      </footer>
    </div>
  );
};

export default ProfilePage;
