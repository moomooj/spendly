import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "An unknown error occurred";
  }

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-4"
    >
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      {errorStatus && (
        <p className="text-xl font-semibold text-red-500 mb-4">
          Error {errorStatus}
        </p>
      )}
      <p className="text-md text-gray-600 bg-red-100 p-4 rounded-lg">
        <i>{errorMessage}</i>
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
