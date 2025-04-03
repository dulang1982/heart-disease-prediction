import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-between bg-gray-100 px-8 pt-8 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center max-w-3xl py-16">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
          Welcome to <span className="text-blue-600">Our Website</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mt-4">
          This platform is designed to help you make informed decisions, improve
          your lifestyle, and stay healthy. Whether you&apos;re seeking expert
          advice, personalized recommendations, or tracking your progress,
          we&apos;re here to support you every step of the way.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/auth/signin"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-wrap items-center justify-center gap-6 py-2 border-t text-gray-600">
        <p>
          This tool is for informational purposes only. Consult a healthcare
          professional for medical advice.
        </p>
      </footer>
    </div>
  );
}
