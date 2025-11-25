import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-Sly-bg dark:bg-Sly-D-bg text-center p-4">
      <h1 className="text-6xl font-bold text-Sly-Text dark:text-gray-200 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-Sly-grey-500 dark:text-Sly-grey-300 mb-2">
        Page Not Found
      </h2>
      <p className="text-Sly-grey-500 dark:text-Sly-grey-500 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-Sly-grey-900 text-white rounded-lg shadow hover:bg-Sly-grey-700 dark:bg-Sly-blue dark:hover:opacity-90 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
