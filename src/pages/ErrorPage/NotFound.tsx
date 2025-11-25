import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
