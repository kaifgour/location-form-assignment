// src/pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex  justify-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <p className="mb-6 text-xl">Choose a task to explore:</p>
        <div className="flex flex-col gap-4">
          <Link
            href="/store-locator"
            className="inline-block bg-white text-black px-4 py-2 rounded border border-gray-300 shadow hover:bg-gray-300"
          >
            {"TASK 1 (Store Locator)"}
          </Link>
          <Link
            href="/contact-form"
            className="inline-block bg-white text-black px-4 py-2 rounded border border-gray-300 shadow hover:bg-gray-300"
          >
            {"TASK 2 (Contact Form)"}
          </Link>
        </div>
      </div>
    </div>
  );
}
