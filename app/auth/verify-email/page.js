"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessage("Email Verified Successfully! ✅ Redirecting...");
            setTimeout(() => router.push("/auth/signin"), 3000); // Redirect after 3s
          } else {
            setMessage("Invalid or Expired Token ❌");
          }
        })
        .catch(() => setMessage("Something went wrong! ❌"));
    } else {
      setMessage("No Token Provided ❌");
    }
  }, [token, router]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">{message}</h1>
      <Link
        href="/auth/signup"
        className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
      >
        Back to Sign Up
      </Link>
    </div>
  );
}
