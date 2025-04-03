import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-between bg-gray-100 p-8 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center max-w-3xl py-16">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
          Welcome to <span className="text-blue-600">Our Website</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mt-4">
          Your one-stop platform for seamless interactions and amazing
          experiences.
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
      <footer className="w-full flex flex-wrap items-center justify-center gap-6 py-6 border-t">
        <a
          className="flex items-center gap-2 text-gray-600 hover:underline"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-gray-600 hover:underline"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-gray-600 hover:underline"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Next.js
        </a>
      </footer>
    </div>
  );
}
